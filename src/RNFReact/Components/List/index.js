/* @flow */

import createComponent from '../../createComponent'
import getReactKey from '../../getReactKey'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import Row from '../Row'
import immutable from 'immutable'
import wrapInSectionsIfRequired from './wrapInSectionsIfRequired'
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    row: {
        paddingLeft: 8,
    },
    rowText: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    separator: {
        borderColor: 'rgb(175, 175, 175)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 4,
        overflow: 'hidden',
    },
})

const getIdentitiesFromList = (list) => list.keySeq().toArray()
const cloneWithRowsAndSections = (dataSource, sections) =>
     dataSource.cloneWithRowsAndSections(
         sections.toArray(),
         getIdentitiesFromList(sections),
         sections.map((section) => getIdentitiesFromList(section.get('items'))).toArray(),
     )

const renderScrollComponent = (properties) => {
    if (properties.onLoadMoreAsync) {
        return (
            <InfiniteScrollView
                distanceToLoadMore={0}
                {...properties}
            />
        )
    }

    return <ScrollView {...properties} />
}

const propTypes = {
    // ...ListView.propTypes,
    canLoadMore: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]),
    distanceToLoadMore: PropTypes.number,
    onLoadError: PropTypes.func,
    onLoadMoreAsync: PropTypes.func,
    renderLoadingErrorIndicator: PropTypes.func,
    renderLoadingIndicator: PropTypes.func,
}

// eslint-disable-next-line react/no-multi-comp
class List extends React.Component {
    static propTypes = propTypes

    constructor(props) {
        super(props)

        // const dataSource = new ListView.DataSource({
        //     rowHasChanged: (r1, r2) => r1 !== r2,
        //     sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        //     getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
        //     getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID].getIn(['items', rowID]),
        // })
        this.state = {
            // dataSource: cloneWithRowsAndSections(dataSource, wrapInSectionsIfRequired(props.rowData)),
        }

        this.renderFooter = props.renderFooter ? props.renderFooter : null
        this.renderRow = this.renderRow.bind(this)
        this.renderSeparator = this.renderSeparator.bind(this)
        this.renderSectionHeader = this.renderSectionHeader.bind(this)
    }

    // componentWillReceiveProps(props) {
    //     this.setState({
    //         dataSource: cloneWithRowsAndSections(this.state.dataSource, wrapInSectionsIfRequired(props.rowData)),
    //     })
    // }

    renderRow(item, columnID, rowID) {
        if (this.props.renderRow) {
            return this.props.renderRow(item, columnID, rowID)
        } else if (this.props.renderRowView) {
            return (
                <Row key={getReactKey(item)}>{this.props.renderRowView(item, columnID, rowID)}</Row>
            )
        }

        return (
            <Row key={getReactKey(item)}><Text style={styles.rowText}>{item}</Text></Row>
        )
    }

    renderSeparator(sectionID: number, rowID: number) { // eslint-disable-line complexity
        if (this.props.shouldRenderSeparator === false) {
            return null
        }

        if (this.props.shouldRenderLastSeparator === false) {
            const sectionLength = this.state.dataSource.getSectionLengths()[sectionID]
            const isLastRow = (rowID + 1 === sectionLength)

            if (isLastRow) {
                return null
            }
        }

        if (this.props.renderSeparator) {
            return this.props.renderSeparator(sectionID, rowID)
        }

        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={styles.separator}
            />
        )
    }

    renderSectionHeader(section, sectionID) {
        if (this.props.renderSectionHeader) {
            return this.props.renderSectionHeader(section, sectionID)
        }

        return null
    }

    render() {
        /*return (
            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections
                initialListSize={1}
                pageSize={1}
                removeClippedSubviews={false}
                renderFooter={this.renderFooter}
                renderRow={this.renderRow}
                renderScrollComponent={renderScrollComponent}
                renderSectionHeader={this.renderSectionHeader}
                renderSeparator={this.renderSeparator}
                scrollRenderAheadDistance={3000}
                stickyHeaderIndices={[]}
                {...this.props}
            />
        )*/
        return (
            <FlatList
                data={this.props.rowData.valueSeq().toArray()}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                {...this.props}
            />
        )
    }
}

delete List.propTypes.renderRow
delete List.propTypes.dataSource
delete List.propTypes.renderScrollComponent
delete List.propTypes.pageSize
delete List.propTypes.stickyHeaderIndices
delete List.propTypes.initialListSize
delete List.propTypes.onEndReachedThreshold
delete List.propTypes.scrollRenderAheadDistance

List.defaultProps = {
    shouldRenderLastSeparator: true,
}

export default createComponent({displayName: 'List'}, List)
