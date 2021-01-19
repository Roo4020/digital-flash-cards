export const INITIAL_VOCABULARY_LIST = [
    [{
            word: "Mann",
            meaning: "男の人",
            distinction: "男性",
            plural: "Männer",
            representative: true
        },
        {
            word: "Frau",
            meaning: "女の人",
            distinction: "女性",
            plural: "Frauen",
            representative: true
        }
    ],
    [{
            word: "heißen",
            meaning: "という名前だ",
            distinction: "一般動詞",
            conjugationList: ["heiße", "heißt", "heißt", "heißt", "hießen", "geheißen"],
            representative: true
        },
        {
            word: "fahren",
            meaning: "乗って行く",
            distinction: "一般動詞",
            conjugationList: ["fahre", "fährst", "fährt", "fahrt", "fuhren", "gefahren"],
            representative: true
        }
    ],
    [{
            word: "gut",
            meaning: "良い",
            distinction: "形容詞",
            representative: true
        },
        {
            word: "schlecht",
            meaning: "悪い",
            distinction: "形容詞",
            representative: true
        }
    ],
    [{
            word: "wegen",
            meaning: "のせいで",
            case: "２格",
            representative: true
        },
        {
            word: "von",
            meaning: "から",
            case: "３格",
            representative: true
        }
    ],
    [{
            word: "und",
            meaning: "そして",
            distinction: "並列",
            representative: true
        },
        {
            word: "also",
            meaning: "だから",
            distinction: "副詞的",
            representative: true
        }
    ]
];