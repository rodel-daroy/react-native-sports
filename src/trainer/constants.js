/* @flow */

export const GET_SWEAT_TRAINERS = 'GET_SWEAT_TRAINERS'
export const GET_BOOKABLE_ITEMS = 'GET_BOOKABLE_ITEMS'
export const GET_TRAINER_SESSION_PRICE = 'GET_TRAINER_SESSION_PRICE'
export const BOOK_TRAINER = 'BOOK_TRAINER'
export const REQUEST_NAME = 'trainers/item'
export const TRAINER_DATE_FILTER_NAME = 'TRAINER_DATE_FILTER_NAME'
export const TREATMENT_DATE_FILTER_NAME = 'TREATMENT_DATE_FILTER_NAME'
export const GET_TIER_PRICE_LIST = 'GET_TIER_PRICE_LIST'
export const PAY_PRICE_ITEM = 'PAY_PRICE_ITEM'
export const BOOK_PROCEED = 'BOOK_PROCEED'
export const TIER_LIST = {
    TIER_ALL: 'All',
    TIER_1: 'Tier 1',
    TIER_2: 'Tier 2',
};
export const PROGRAMID_LIST = {
    PERSONAL: "2",
    COMBAT: "3",
    SC: "12",
    MIXED: "8"
};

export const TIER_PRICE_LIST = {
    personal: [
        {
            title: 'HOW WOULD YOU LIKE TO PAY',
            items: [
                {
                    id: 1,
                    name: 'ONE OF SESSION',
                    price: 85,
                    desc: 'Single Session: £85',
                }
            ]
        },
        {
            title: 'TIER 1 PERSONAL TRAINING PACK',
            items: [
                {
                    id: 2,
                    name: 'MIDDLEWEIGHT 12 SESSIONS',
                    price: 930,
                    desc: 'Middleweight Package (12 sessions): £930 (£77.50 per session) This package is associated with a £90 saving and has a 6 month expiry',
                },
                {
                    id: 3,
                    name: 'HEAVYWEIGHT 24 SESSIONS',
                    price: 1800,
                    desc: 'Heavyweight Package (24 sessions): £1,800 (£75.00 per session) This package is associated with a £240 saving and has a nine-month expiry',
                }
            ]
        }
    ],
    combat: [
        {
            title: 'HOW WOULD YOU LIKE TO PAY',
            items: [
                {
                    id: 4,
                    name: 'ONE OF SESSION',
                    price: 105,
                    desc: 'Single Session: £105',
                }
            ]
        },
        {
            title: 'TIER 1 COMBAT COACHING PACK',
            items: [
                {
                    id: 5,
                    name: 'MIDDLEWEIGHT 12 SESSIONS',
                    price: 1160,
                    desc: 'Middleweight Package x12 sessions: £1160 (£96.67 per session) This package is associated with a £100 saving and has a 6 month expiry',
                },
                {
                    id: 6,
                    name: 'HEAVYWEIGHT 24 SESSIONS',
                    price: 2160,
                    desc: 'Heavy weight Package x24 sessions: £2160 (£90 per session) This package is associated with a £360 saving and has a 9 month expiry',
                }
            ]
        },
        {
            title: 'TIER 1 MIXED COACHING PACK',
            items: [
                {
                    id: 7,
                    name: 'MIDDLEWEIGHT 12 SESSIONS',
                    price: 1160,
                    desc: 'Middleweight Package (12 sessions): £930 (£77.50 per session) This package is associated with a £90 saving adn has a 6 month expiry',
                },
                {
                    id: 8,
                    name: 'HEAVYWEIGHT 24 SESSIONS',
                    price: 2160,
                    desc: 'Heavyweight Package (24 sessions): £1,800 (£75.00 per session) This package is associated with a £240 saving adn has a nine-month expiry',
                }
            ]
        }
    ],
};
