/* @flow */

import R from 'ramda'

const list = [
    {
        key: 'ABE',
        label: 'Aberdeen City',
    },
    {
        key: 'ABD',
        label: 'Aberdeenshire',
    },
    {
        key: 'ANS',
        label: 'Angus',
    },
    {
        key: 'ANT',
        label: 'Antrim',
    },
    {
        key: 'ARD',
        label: 'Ards',
    },
    {
        key: 'AGB',
        label: 'Argyll and Bute',
    },
    {
        key: 'ARM',
        label: 'Armagh',
    },
    {
        key: 'BLA',
        label: 'Ballymena',
    },
    {
        key: 'BLY',
        label: 'Ballymoney',
    },
    {
        key: 'BNB',
        label: 'Banbridge',
    },
    {
        key: 'BNE',
        label: 'Barnet (London borough)',
    },
    {
        key: 'BNS',
        label: 'Barnsley (South Yorkshire district)',
    },
    {
        key: 'BAS',
        label: 'Bath and North East Somerset (unitary authority)',
    },
    {
        key: 'BDF',
        label: 'Bedfordshire (county)',
    },
    {
        key: 'BFS',
        label: 'Belfast',
    },
    {
        key: 'BRK',
        label: 'Berkshire',
    },
    {
        key: 'BEX',
        label: 'Bexley (London borough)',
    },
    {
        key: 'BIR',
        label: 'Birmingham (West Midlands district)',
    },
    {
        key: 'BBD',
        label: 'Blackburn with Darwen',
    },
    {
        key: 'BPL',
        label: 'Blackpool',
    },
    {
        key: 'BGW',
        label: 'Blaenau Gwent',
    },
    {
        key: 'BOL',
        label: 'Bolton (Manchester borough)',
    },
    {
        key: 'BMH',
        label: 'Bournemouth',
    },
    {
        key: 'BRC',
        label: 'Bracknell Forest',
    },
    {
        key: 'BRD',
        label: 'Bradford (West Yorkshire district)',
    },
    {
        key: 'BEN',
        label: 'Brent (London borough)',
    },
    {
        key: 'BGE',
        label: 'Bridgend',
    },
    {
        key: 'BNH',
        label: 'Brighton and Hove',
    },
    {
        key: 'BST',
        label: 'Bristol, City of',
    },
    {
        key: 'BRY',
        label: 'Bromley (London borough)',
    },
    {
        key: 'BKM',
        label: 'Buckinghamshire (county)',
    },
    {
        key: 'BUR',
        label: 'Bury (Manchester borough)',
    },
    {
        key: 'CAY',
        label: 'Caerphilly',
    },
    {
        key: 'CLD',
        label: 'Calderdale (West Yorkshire district)',
    },
    {
        key: 'CAM',
        label: 'Cambridgeshire (county)',
    },
    {
        key: 'CMD',
        label: 'Camden (London borough)',
    },
    {
        key: 'CRF',
        label: 'Cardiff',
    },
    {
        key: 'CMN',
        label: 'Carmarthenshire',
    },
    {
        key: 'CKF',
        label: 'Carrickfergus',
    },
    {
        key: 'CSR',
        label: 'Castlereagh',
    },
    {
        key: 'CGN',
        label: 'Ceredigion',
    },
    {
        key: 'CHS',
        label: 'Cheshire (county)',
    },
    {
        key: 'CLK',
        label: 'Clackmannanshire',
    },
    {
        key: 'CLR',
        label: 'Coleraine',
    },
    {
        key: 'CWY',
        label: 'Conwy',
    },
    {
        key: 'CKT',
        label: 'Cookstown',
    },
    {
        key: 'CON',
        label: 'Cornwall (county)',
    },
    {
        key: 'COV',
        label: 'Coventry (West Midlands district)',
    },
    {
        key: 'CGV',
        label: 'Craigavon',
    },
    {
        key: 'CRY',
        label: 'Croydon (London borough)',
    },
    {
        key: 'CMA',
        label: 'Cumbria (county)',
    },
    {
        key: 'DAL',
        label: 'Darlington (unitary authority)',
    },
    {
        key: 'DEN',
        label: 'Denbighshire',
    },
    {
        key: 'DER',
        label: 'Derby',
    },
    {
        key: 'DBY',
        label: 'Derbyshire (county)',
    },
    {
        key: 'DRY',
        label: 'Derry',
    },
    {
        key: 'DEV',
        label: 'Devon (county)',
    },
    {
        key: 'DNC',
        label: 'Doncaster (South Yorkshire district)',
    },
    {
        key: 'DOR',
        label: 'Dorset (county)',
    },
    {
        key: 'DOW',
        label: 'Down',
    },
    {
        key: 'DUD',
        label: 'Dudley (West Midlands district)',
    },
    {
        key: 'DGY',
        label: 'Dumfries and Galloway',
    },
    {
        key: 'DND',
        label: 'Dundee City',
    },
    {
        key: 'DGN',
        label: 'Dungannon',
    },
    {
        key: 'DUR',
        label: 'Durham',
    },
    {
        key: 'EAL',
        label: 'Ealing (London borough)',
    },
    {
        key: 'EAY',
        label: 'East Ayrshire',
    },
    {
        key: 'EDU',
        label: 'East Dunbartonshire',
    },
    {
        key: 'ELN',
        label: 'East Lothian',
    },
    {
        key: 'ERW',
        label: 'East Renfrewshire',
    },
    {
        key: 'ERY',
        label: 'East Riding of Yorkshire',
    },
    {
        key: 'ESX',
        label: 'East Sussex (county)',
    },
    {
        key: 'EDH',
        label: 'Edinburgh, City of',
    },
    {
        key: 'ELS',
        label: 'Eilean Siar',
    },
    {
        key: 'ENF',
        label: 'Enfield (London borough)',
    },
    {
        key: 'ESS',
        label: 'Essex (county)',
    },
    {
        key: 'FAL',
        label: 'Falkirk',
    },
    {
        key: 'FER',
        label: 'Fermanagh',
    },
    {
        key: 'FIF',
        label: 'Fife',
    },
    {
        key: 'FLN',
        label: 'Flintshire',
    },
    {
        key: 'GAT',
        label: 'Gateshead',
    },
    {
        key: 'GLG',
        label: 'Glasgow City',
    },
    {
        key: 'GLS',
        label: 'Gloucestershire (county)',
    },
    {
        key: 'GRE',
        label: 'Greenwich (London borough)',
    },
    {
        key: 'GY',
        label: 'Guernsey',
    },
    {
        key: 'GWN',
        label: 'Gwynedd',
    },
    {
        key: 'HCK',
        label: 'Hackney (London borough)',
    },
    {
        key: 'HAL',
        label: 'Halton (unitary authority)',
    },
    {
        key: 'HMF',
        label: 'Hammersmith and Fulham (London borough)',
    },
    {
        key: 'HAM',
        label: 'Hampshire (county)',
    },
    {
        key: 'HRY',
        label: 'Haringey (London borough)',
    },
    {
        key: 'HRW',
        label: 'Harrow (London borough)',
    },
    {
        key: 'HPL',
        label: 'Hartlepool (unitary authority)',
    },
    {
        key: 'HAV',
        label: 'Havering (London borough)',
    },
    {
        key: 'HEF',
        label: 'Herefordshire, County of (unitary authority)',
    },
    {
        key: 'HRT',
        label: 'Hertfordshire (county)',
    },
    {
        key: 'HLD',
        label: 'Highland',
    },
    {
        key: 'HIL',
        label: 'Hillingdon (London borough)',
    },
    {
        key: 'HNS',
        label: 'Hounslow (London borough)',
    },
    {
        key: 'IVC',
        label: 'Inverclyde',
    },
    {
        key: 'AGY',
        label: 'Isle of Anglesey',
    },
    {
        key: 'IM',
        label: 'Isle of Man',
    },
    {
        key: 'IOM',
        label: 'Isle of Man',
    },
    {
        key: 'IOW',
        label: 'Isle of Wight (county)',
    },
    {
        key: 'IOS',
        label: 'Isles of Scilly',
    },
    {
        key: 'ISL',
        label: 'Islington (London borough)',
    },
    {
        key: 'JE',
        label: 'Jersey',
    },
    {
        key: 'KEC',
        label: 'Kensington and Chelsea (London borough)',
    },
    {
        key: 'KEN',
        label: 'Kent (county)',
    },
    {
        key: 'KHL',
        label: 'Kingston upon Hull, City of (unitary authority)',
    },
    {
        key: 'KTT',
        label: 'Kingston upon Thames (London borough)',
    },
    {
        key: 'KIR',
        label: 'Kirklees (West Yorkshire district)',
    },
    {
        key: 'KWL',
        label: 'Knowsley (metropolitan borough of Merseyside)',
    },
    {
        key: 'LBH',
        label: 'Lambeth (London borough)',
    },
    {
        key: 'LAN',
        label: 'Lancashire (county)',
    },
    {
        key: 'LRN',
        label: 'Larne',
    },
    {
        key: 'LDS',
        label: 'Leeds (West Yorkshire district)',
    },
    {
        key: 'LCE',
        label: 'Leicester (unitary authority)',
    },
    {
        key: 'LEC',
        label: 'Leicestershire (county)',
    },
    {
        key: 'LEW',
        label: 'Lewisham (London borough)',
    },
    {
        key: 'LMV',
        label: 'Limavady',
    },
    {
        key: 'LIN',
        label: 'Lincolnshire (county)',
    },
    {
        key: 'LSB',
        label: 'Lisburn',
    },
    {
        key: 'LIV',
        label: 'Liverpool',
    },
    {
        key: 'LND',
        label: 'London, City of',
    },
    {
        key: 'LUT',
        label: 'Luton (unitary authority)',
    },
    {
        key: 'MFT',
        label: 'Magherafelt',
    },
    {
        key: 'MAN',
        label: 'Manchester (Manchester borough)',
    },
    {
        key: 'MDW',
        label: 'Medway (unitary authority)',
    },
    {
        key: 'MRS',
        label: 'Merseyside (county)',
    },
    {
        key: 'MTY',
        label: 'Merthyr Tydfil',
    },
    {
        key: 'MRT',
        label: 'Merton (London borough)',
    },
    {
        key: 'MDB',
        label: 'Middlesbrough (unitary authority)',
    },
    {
        key: 'MDS',
        label: 'Middlesex',
    },
    {
        key: 'MLN',
        label: 'Midlothian',
    },
    {
        key: 'MIK',
        label: 'Milton Keynes',
    },
    {
        key: 'MON',
        label: 'Monmouthshire',
    },
    {
        key: 'MRY',
        label: 'Moray',
    },
    {
        key: 'MYL',
        label: 'Moyle',
    },
    {
        key: 'NTL',
        label: 'Neath Port Talbot',
    },
    {
        key: 'NET',
        label: 'Newcastle upon Tyne',
    },
    {
        key: 'NWM',
        label: 'Newham (London borough)',
    },
    {
        key: 'NWP',
        label: 'Newport',
    },
    {
        key: 'NYM',
        label: 'Newry and Mourne',
    },
    {
        key: 'NTA',
        label: 'Newtownabbey',
    },
    {
        key: 'NFK',
        label: 'Norfolk (county)',
    },
    {
        key: 'NAY',
        label: 'North Ayrshire',
    },
    {
        key: 'NDN',
        label: 'North Down NIR',
    },
    {
        key: 'NEL',
        label: 'North East Lincolnshire (unitary authority)',
    },
    {
        key: 'NLK',
        label: 'North Lanarkshire',
    },
    {
        key: 'NLN',
        label: 'North Lincolnshire (unitary authority)',
    },
    {
        key: 'NSM',
        label: 'North Somerset (unitary authority)',
    },
    {
        key: 'NTY',
        label: 'North Tyneside (unitary authority)',
    },
    {
        key: 'NYK',
        label: 'North Yorkshire (unitary authority)',
    },
    {
        key: 'NTH',
        label: 'Northamptonshire (county)',
    },
    {
        key: 'NBL',
        label: 'Northumberland',
    },
    {
        key: 'NGM',
        label: 'Nottingham',
    },
    {
        key: 'NTT',
        label: 'Nottinghamshire (county)',
    },
    {
        key: 'OLD',
        label: 'Oldham (Manchester borough)',
    },
    {
        key: 'OMH',
        label: 'Omagh',
    },
    {
        key: 'ORK',
        label: 'Orkney Islands',
    },
    {
        key: 'OXF',
        label: 'Oxfordshire (county)',
    },
    {
        key: 'PEM',
        label: 'Pembrokeshire',
    },
    {
        key: 'PKN',
        label: 'Perth and Kinross',
    },
    {
        key: 'PTE',
        label: 'Peterborough (unitary authority)',
    },
    {
        key: 'PLY',
        label: 'Plymouth, England',
    },
    {
        key: 'POL',
        label: 'Poole',
    },
    {
        key: 'POR',
        label: 'Portsmouth',
    },
    {
        key: 'POW',
        label: 'Powys',
    },
    {
        key: 'RDG',
        label: 'Reading',
    },
    {
        key: 'RDB',
        label: 'Redbridge (London Borough)',
    },
    {
        key: 'RCC',
        label: 'Redcar and Cleveland',
    },
    {
        key: 'RFW',
        label: 'Renfrewshire',
    },
    {
        key: 'RCT',
        label: 'Rhondda Cynon Taf',
    },
    {
        key: 'RIC',
        label: 'Richmond upon Thames (London Borough)',
    },
    {
        key: 'RCH',
        label: 'Rochdale (Manchester borough)',
    },
    {
        key: 'ROT',
        label: 'Rotherham (South Yorkshire district)',
    },
    {
        key: 'RUT',
        label: 'Rutland (county)',
    },
    {
        key: 'SLF',
        label: 'Salford (Manchester borough)',
    },
    {
        key: 'SAW',
        label: 'Sandwell (West Midlands district)',
    },
    {
        key: 'SCB',
        label: 'Scottish Borders, The',
    },
    {
        key: 'SFT',
        label: 'Sefton (Merseyside borough)',
    },
    {
        key: 'SHF',
        label: 'Sheffield (South Yorkshire district)',
    },
    {
        key: 'ZET',
        label: 'Shetland Islands',
    },
    {
        key: 'SHR',
        label: 'Shropshire (county)',
    },
    {
        key: 'SLG',
        label: 'Slough (unitary authority)',
    },
    {
        key: 'SOL',
        label: 'Solihull (West Midlands district)',
    },
    {
        key: 'SOM',
        label: 'Somerset (county)',
    },
    {
        key: 'SAY',
        label: 'South Ayrshire',
    },
    {
        key: 'SGC',
        label: 'South Gloucestershire (county)',
    },
    {
        key: 'SLK',
        label: 'South Lanarkshire',
    },
    {
        key: 'STY',
        label: 'South Tyneside',
    },
    {
        key: 'STH',
        label: 'Southampton',
    },
    {
        key: 'SOS',
        label: 'Southend-on-Sea',
    },
    {
        key: 'SWK',
        label: 'Southwark (London borough)',
    },
    {
        key: 'SHN',
        label: 'St Helens (Merseyside borough)',
    },
    {
        key: 'STS',
        label: 'Staffordshire (county)',
    },
    {
        key: 'STG',
        label: 'Stirling',
    },
    {
        key: 'SKP',
        label: 'Stockport (Manchester borough)',
    },
    {
        key: 'STT',
        label: 'Stockton-on-Tees',
    },
    {
        key: 'STE',
        label: 'Stoke-on-Trent (unitary authority)',
    },
    {
        key: 'STB',
        label: 'Strabane',
    },
    {
        key: 'SFK',
        label: 'Suffolk (county)',
    },
    {
        key: 'GB-SND',
        label: 'derland',
    },
    {
        key: 'SRY',
        label: 'Surrey (county)',
    },
    {
        key: 'STN',
        label: 'Sutton (London borough)',
    },
    {
        key: 'SWA',
        label: 'Swansea',
    },
    {
        key: 'SWD',
        label: 'Swindon',
    },
    {
        key: 'TAM',
        label: 'Tameside (Manchester borough)',
    },
    {
        key: 'TFW',
        label: 'Telford and Wrekin (unitary authority)',
    },
    {
        key: 'THR',
        label: 'Thurrock (unitary authority)',
    },
    {
        key: 'TOB',
        label: 'Torbay',
    },
    {
        key: 'TOF',
        label: 'Torfaen',
    },
    {
        key: 'TWH',
        label: 'Tower Hamlets (London borough)',
    },
    {
        key: 'TRF',
        label: 'Trafford (Manchester borough)',
    },
    {
        key: 'VGL',
        label: 'Vale of Glamorgan',
    },
    {
        key: 'WKF',
        label: 'Wakefield (West Yorkshire district)',
    },
    {
        key: 'WLL',
        label: 'Walsall (West Midlands district)',
    },
    {
        key: 'WFT',
        label: 'Waltham Forest (London borough)',
    },
    {
        key: 'WND',
        label: 'Wandsworth (London borough)',
    },
    {
        key: 'WRT',
        label: 'Warrington (unitary authority)',
    },
    {
        key: 'WAR',
        label: 'Warwickshire (county)',
    },
    {
        key: 'WBK',
        label: 'West Berkshire (unitary authority)',
    },
    {
        key: 'WDU',
        label: 'West Dunbartonshire',
    },
    {
        key: 'WLN',
        label: 'West Lothian',
    },
    {
        key: 'WSX',
        label: 'West Sussex (county)',
    },
    {
        key: 'WSM',
        label: 'Westminster (London borough)',
    },
    {
        key: 'WGN',
        label: 'Wigan (Manchester borough)',
    },
    {
        key: 'WIL',
        label: 'Wiltshire (county)',
    },
    {
        key: 'WNM',
        label: 'Windsor and Maidenhead (unitary authority)',
    },
    {
        key: 'WRL',
        label: 'Wirral (metropolitan borough of Merseyside)',
    },
    {
        key: 'WOK',
        label: 'Wokingham (unitary authority)',
    },
    {
        key: 'WLV',
        label: 'Wolverhampton (West Midlands district)',
    },
    {
        key: 'WOR',
        label: 'Worcestershire (county)',
    },
    {
        key: 'WRX',
        label: 'Wrexham',
    },
]

export const getLabel = (key) => R.compose(
        R.propOr(key, 'label'),
        R.find(R.propEq('key', key)),
    )(list)

export default list
