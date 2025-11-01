export interface StockMover {
  rank: number;
  ticker: string;
  companyName: string;
  price: number;
  change: number;
  percentChange: number;
  volume: string;
  marketCap: string;
  sparklineData: number[];
  high52Week: number;
  low52Week: number;
  peRatio: number;
}

export interface IndustryStocks {
  gainers: StockMover[];
  losers: StockMover[];
}

export const stocksByIndustry: Record<string, IndustryStocks> = {
  technology: {
    gainers: [
      {
        rank: 1,
        ticker: 'NVDA',
        companyName: 'NVIDIA Corporation',
        price: 485.50,
        change: 23.75,
        percentChange: 5.14,
        volume: '45.2M',
        marketCap: '1.2T',
        sparklineData: [450, 455, 460, 465, 470, 480, 485.50],
        high52Week: 502.30,
        low52Week: 180.50,
        peRatio: 68.5
      },
      {
        rank: 2,
        ticker: 'AMD',
        companyName: 'Advanced Micro Devices',
        price: 142.80,
        change: 6.35,
        percentChange: 4.65,
        volume: '38.5M',
        marketCap: '231B',
        sparklineData: [132, 134, 136, 138, 140, 141, 142.80],
        high52Week: 165.50,
        low52Week: 93.12,
        peRatio: 42.3
      },
      {
        rank: 3,
        ticker: 'AVGO',
        companyName: 'Broadcom Inc.',
        price: 1320.45,
        change: 52.20,
        percentChange: 4.12,
        volume: '2.8M',
        marketCap: '612B',
        sparklineData: [1250, 1265, 1280, 1290, 1300, 1310, 1320.45],
        high52Week: 1415.30,
        low52Week: 795.50,
        peRatio: 35.8
      },
      {
        rank: 4,
        ticker: 'ORCL',
        companyName: 'Oracle Corporation',
        price: 128.90,
        change: 4.82,
        percentChange: 3.88,
        volume: '12.3M',
        marketCap: '365B',
        sparklineData: [120, 122, 124, 125, 126, 127, 128.90],
        high52Week: 145.20,
        low52Week: 99.26,
        peRatio: 33.2
      },
      {
        rank: 5,
        ticker: 'CRM',
        companyName: 'Salesforce Inc.',
        price: 285.60,
        change: 9.85,
        percentChange: 3.57,
        volume: '8.7M',
        marketCap: '278B',
        sparklineData: [268, 272, 275, 278, 280, 283, 285.60],
        high52Week: 318.50,
        low52Week: 212.00,
        peRatio: 48.5
      }
    ],
    losers: [
      {
        rank: 1,
        ticker: 'INTC',
        companyName: 'Intel Corporation',
        price: 32.15,
        change: -2.85,
        percentChange: -8.14,
        volume: '52.8M',
        marketCap: '135B',
        sparklineData: [38, 37, 36, 35, 34, 33, 32.15],
        high52Week: 51.28,
        low52Week: 28.39,
        peRatio: -5.2
      },
      {
        rank: 2,
        ticker: 'QCOM',
        companyName: 'QUALCOMM Inc.',
        price: 158.35,
        change: -8.65,
        percentChange: -5.18,
        volume: '18.5M',
        marketCap: '176B',
        sparklineData: [172, 170, 168, 165, 162, 160, 158.35],
        high52Week: 189.50,
        low52Week: 126.85,
        peRatio: 18.5
      },
      {
        rank: 3,
        ticker: 'ADBE',
        companyName: 'Adobe Inc.',
        price: 512.40,
        change: -22.35,
        percentChange: -4.18,
        volume: '5.2M',
        marketCap: '232B',
        sparklineData: [550, 545, 538, 530, 525, 518, 512.40],
        high52Week: 638.25,
        low52Week: 433.97,
        peRatio: 45.2
      },
      {
        rank: 4,
        ticker: 'PANW',
        companyName: 'Palo Alto Networks',
        price: 295.80,
        change: -11.45,
        percentChange: -3.73,
        volume: '6.8M',
        marketCap: '95B',
        sparklineData: [315, 312, 308, 305, 302, 298, 295.80],
        high52Week: 380.84,
        low52Week: 234.15,
        peRatio: 82.3
      },
      {
        rank: 5,
        ticker: 'NOW',
        companyName: 'ServiceNow Inc.',
        price: 782.20,
        change: -26.80,
        percentChange: -3.31,
        volume: '2.1M',
        marketCap: '159B',
        sparklineData: [825, 820, 812, 805, 798, 790, 782.20],
        high52Week: 925.75,
        low52Week: 637.99,
        peRatio: 135.8
      }
    ]
  },
  financialServices: {
    gainers: [
      {
        rank: 1,
        ticker: 'GS',
        companyName: 'Goldman Sachs Group',
        price: 468.90,
        change: 18.25,
        percentChange: 4.05,
        volume: '3.2M',
        marketCap: '158B',
        sparklineData: [442, 448, 452, 458, 462, 465, 468.90],
        high52Week: 512.50,
        low52Week: 323.54,
        peRatio: 14.2
      },
      {
        rank: 2,
        ticker: 'MS',
        companyName: 'Morgan Stanley',
        price: 105.85,
        change: 3.92,
        percentChange: 3.85,
        volume: '8.5M',
        marketCap: '172B',
        sparklineData: [99, 100, 102, 103, 104, 105, 105.85],
        high52Week: 115.25,
        low52Week: 76.54,
        peRatio: 16.8
      },
      {
        rank: 3,
        ticker: 'JPM',
        companyName: 'JPMorgan Chase',
        price: 198.45,
        change: 6.85,
        percentChange: 3.57,
        volume: '12.5M',
        marketCap: '574B',
        sparklineData: [188, 190, 193, 195, 196, 197, 198.45],
        high52Week: 224.50,
        low52Week: 135.19,
        peRatio: 12.5
      },
      {
        rank: 4,
        ticker: 'V',
        companyName: 'Visa Inc.',
        price: 282.35,
        change: 9.15,
        percentChange: 3.35,
        volume: '7.8M',
        marketCap: '598B',
        sparklineData: [268, 272, 275, 277, 279, 281, 282.35],
        high52Week: 305.75,
        low52Week: 227.54,
        peRatio: 33.2
      },
      {
        rank: 5,
        ticker: 'MA',
        companyName: 'Mastercard Inc.',
        price: 485.60,
        change: 14.25,
        percentChange: 3.02,
        volume: '4.2M',
        marketCap: '456B',
        sparklineData: [465, 470, 474, 478, 481, 483, 485.60],
        high52Week: 520.85,
        low52Week: 380.23,
        peRatio: 38.5
      }
    ],
    losers: [
      {
        rank: 1,
        ticker: 'WFC',
        companyName: 'Wells Fargo',
        price: 52.80,
        change: -2.85,
        percentChange: -5.12,
        volume: '28.5M',
        marketCap: '185B',
        sparklineData: [58, 57, 56, 55, 54, 53, 52.80],
        high52Week: 65.43,
        low52Week: 40.52,
        peRatio: 11.8
      },
      {
        rank: 2,
        ticker: 'C',
        companyName: 'Citigroup Inc.',
        price: 62.15,
        change: -2.65,
        percentChange: -4.09,
        volume: '22.3M',
        marketCap: '118B',
        sparklineData: [68, 67, 66, 65, 64, 63, 62.15],
        high52Week: 72.56,
        low52Week: 38.17,
        peRatio: 9.5
      },
      {
        rank: 3,
        ticker: 'BAC',
        companyName: 'Bank of America',
        price: 38.90,
        change: -1.42,
        percentChange: -3.52,
        volume: '45.8M',
        marketCap: '305B',
        sparklineData: [42, 41, 40.5, 40, 39.5, 39, 38.90],
        high52Week: 45.92,
        low52Week: 26.34,
        peRatio: 13.2
      },
      {
        rank: 4,
        ticker: 'AXP',
        companyName: 'American Express',
        price: 248.35,
        change: -8.15,
        percentChange: -3.18,
        volume: '5.2M',
        marketCap: '179B',
        sparklineData: [265, 262, 258, 255, 252, 250, 248.35],
        high52Week: 285.65,
        low52Week: 150.27,
        peRatio: 19.8
      },
      {
        rank: 5,
        ticker: 'BK',
        companyName: 'Bank of New York Mellon',
        price: 58.45,
        change: -1.65,
        percentChange: -2.75,
        volume: '6.8M',
        marketCap: '46B',
        sparklineData: [62, 61.5, 61, 60.5, 60, 59, 58.45],
        high52Week: 68.75,
        low52Week: 42.85,
        peRatio: 14.5
      }
    ]
  },
  healthcare: {
    gainers: [
      {
        rank: 1,
        ticker: 'LLY',
        companyName: 'Eli Lilly',
        price: 782.50,
        change: 32.85,
        percentChange: 4.38,
        volume: '4.5M',
        marketCap: '742B',
        sparklineData: [735, 745, 755, 762, 770, 778, 782.50],
        high52Week: 825.50,
        low52Week: 497.28,
        peRatio: 88.5
      },
      {
        rank: 2,
        ticker: 'UNH',
        companyName: 'UnitedHealth Group',
        price: 512.35,
        change: 19.80,
        percentChange: 4.02,
        volume: '5.8M',
        marketCap: '476B',
        sparklineData: [485, 490, 495, 500, 505, 508, 512.35],
        high52Week: 598.25,
        low52Week: 445.68,
        peRatio: 24.8
      },
      {
        rank: 3,
        ticker: 'ABBV',
        companyName: 'AbbVie Inc.',
        price: 168.90,
        change: 6.15,
        percentChange: 3.78,
        volume: '9.2M',
        marketCap: '298B',
        sparklineData: [158, 160, 163, 165, 166, 167, 168.90],
        high52Week: 195.50,
        low52Week: 138.65,
        peRatio: 38.2
      },
      {
        rank: 4,
        ticker: 'AMGN',
        companyName: 'Amgen Inc.',
        price: 298.75,
        change: 10.25,
        percentChange: 3.55,
        volume: '3.8M',
        marketCap: '159B',
        sparklineData: [282, 286, 289, 292, 295, 297, 298.75],
        high52Week: 325.75,
        low52Week: 254.32,
        peRatio: 19.5
      },
      {
        rank: 5,
        ticker: 'GILD',
        companyName: 'Gilead Sciences',
        price: 82.40,
        change: 2.65,
        percentChange: 3.32,
        volume: '8.5M',
        marketCap: '103B',
        sparklineData: [77, 78, 79, 80, 81, 82, 82.40],
        high52Week: 95.68,
        low52Week: 63.92,
        peRatio: 32.5
      }
    ],
    losers: [
      {
        rank: 1,
        ticker: 'CVS',
        companyName: 'CVS Health',
        price: 58.25,
        change: -3.85,
        percentChange: -6.20,
        volume: '15.8M',
        marketCap: '72B',
        sparklineData: [68, 66, 64, 62, 60, 59, 58.25],
        high52Week: 88.75,
        low52Week: 54.82,
        peRatio: 11.2
      },
      {
        rank: 2,
        ticker: 'PFE',
        companyName: 'Pfizer Inc.',
        price: 28.65,
        change: -1.52,
        percentChange: -5.04,
        volume: '42.5M',
        marketCap: '161B',
        sparklineData: [32, 31.5, 31, 30.5, 30, 29, 28.65],
        high52Week: 35.78,
        low52Week: 25.20,
        peRatio: 8.5
      },
      {
        rank: 3,
        ticker: 'BMY',
        companyName: 'Bristol Myers Squibb',
        price: 52.80,
        change: -2.25,
        percentChange: -4.09,
        volume: '18.5M',
        marketCap: '109B',
        sparklineData: [58, 57, 56, 55, 54, 53, 52.80],
        high52Week: 62.45,
        low52Week: 39.35,
        peRatio: -12.5
      },
      {
        rank: 4,
        ticker: 'MRK',
        companyName: 'Merck & Co.',
        price: 98.45,
        change: -3.52,
        percentChange: -3.45,
        volume: '12.8M',
        marketCap: '249B',
        sparklineData: [108, 106, 104, 102, 100, 99, 98.45],
        high52Week: 129.50,
        low52Week: 95.32,
        peRatio: 15.8
      },
      {
        rank: 5,
        ticker: 'HCA',
        companyName: 'HCA Healthcare',
        price: 325.80,
        change: -10.85,
        percentChange: -3.22,
        volume: '2.5M',
        marketCap: '91B',
        sparklineData: [348, 345, 342, 338, 332, 328, 325.80],
        high52Week: 385.50,
        low52Week: 265.75,
        peRatio: 14.2
      }
    ]
  },
  energy: {
    gainers: [
      {
        rank: 1,
        ticker: 'SLB',
        companyName: 'Schlumberger',
        price: 48.90,
        change: 2.15,
        percentChange: 4.60,
        volume: '12.5M',
        marketCap: '68B',
        sparklineData: [45, 45.5, 46, 46.5, 47, 48, 48.90],
        high52Week: 62.50,
        low52Week: 42.45,
        peRatio: 12.8
      },
      {
        rank: 2,
        ticker: 'HAL',
        companyName: 'Halliburton',
        price: 35.60,
        change: 1.48,
        percentChange: 4.34,
        volume: '15.2M',
        marketCap: '31B',
        sparklineData: [32, 32.5, 33, 33.5, 34, 35, 35.60],
        high52Week: 45.75,
        low52Week: 28.92,
        peRatio: 9.5
      },
      {
        rank: 3,
        ticker: 'MPC',
        companyName: 'Marathon Petroleum',
        price: 168.45,
        change: 6.25,
        percentChange: 3.85,
        volume: '4.8M',
        marketCap: '62B',
        sparklineData: [158, 160, 162, 164, 166, 167, 168.45],
        high52Week: 195.50,
        low52Week: 135.68,
        peRatio: 10.2
      },
      {
        rank: 4,
        ticker: 'PSX',
        companyName: 'Phillips 66',
        price: 142.35,
        change: 5.15,
        percentChange: 3.75,
        volume: '3.5M',
        marketCap: '67B',
        sparklineData: [134, 136, 138, 139, 140, 141, 142.35],
        high52Week: 165.75,
        low52Week: 115.25,
        peRatio: 11.8
      },
      {
        rank: 5,
        ticker: 'VLO',
        companyName: 'Valero Energy',
        price: 138.80,
        change: 4.65,
        percentChange: 3.47,
        volume: '5.2M',
        marketCap: '48B',
        sparklineData: [130, 132, 134, 135, 136, 137, 138.80],
        high52Week: 168.50,
        low52Week: 120.45,
        peRatio: 9.8
      }
    ],
    losers: [
      {
        rank: 1,
        ticker: 'OXY',
        companyName: 'Occidental Petroleum',
        price: 52.35,
        change: -3.25,
        percentChange: -5.85,
        volume: '22.5M',
        marketCap: '47B',
        sparklineData: [62, 60, 58, 56, 54, 53, 52.35],
        high52Week: 72.50,
        low52Week: 50.28,
        peRatio: 8.2
      },
      {
        rank: 2,
        ticker: 'DVN',
        companyName: 'Devon Energy',
        price: 42.80,
        change: -2.15,
        percentChange: -4.78,
        volume: '18.5M',
        marketCap: '27B',
        sparklineData: [50, 49, 47, 46, 45, 44, 42.80],
        high52Week: 58.75,
        low52Week: 39.85,
        peRatio: 7.5
      },
      {
        rank: 3,
        ticker: 'COP',
        companyName: 'ConocoPhillips',
        price: 105.45,
        change: -4.85,
        percentChange: -4.40,
        volume: '12.8M',
        marketCap: '127B',
        sparklineData: [118, 116, 114, 112, 108, 106, 105.45],
        high52Week: 138.50,
        low52Week: 101.25,
        peRatio: 10.5
      },
      {
        rank: 4,
        ticker: 'EOG',
        companyName: 'EOG Resources',
        price: 118.90,
        change: -4.95,
        percentChange: -4.00,
        volume: '6.5M',
        marketCap: '69B',
        sparklineData: [132, 130, 128, 125, 122, 120, 118.90],
        high52Week: 145.75,
        low52Week: 110.32,
        peRatio: 11.2
      },
      {
        rank: 5,
        ticker: 'XOM',
        companyName: 'Exxon Mobil',
        price: 112.35,
        change: -4.15,
        percentChange: -3.56,
        volume: '28.5M',
        marketCap: '462B',
        sparklineData: [122, 120, 118, 116, 114, 113, 112.35],
        high52Week: 128.75,
        low52Week: 95.68,
        peRatio: 12.8
      }
    ]
  },
  consumerDiscretionary: {
    gainers: [
      {
        rank: 1,
        ticker: 'TSLA',
        companyName: 'Tesla Inc.',
        price: 245.80,
        change: 12.45,
        percentChange: 5.34,
        volume: '125.5M',
        marketCap: '781B',
        sparklineData: [220, 225, 230, 235, 238, 242, 245.80],
        high52Week: 299.50,
        low52Week: 138.80,
        peRatio: 65.8
      },
      {
        rank: 2,
        ticker: 'AMZN',
        companyName: 'Amazon.com',
        price: 178.90,
        change: 8.25,
        percentChange: 4.83,
        volume: '58.5M',
        marketCap: '1.86T',
        sparklineData: [165, 168, 171, 174, 176, 177, 178.90],
        high52Week: 201.50,
        low52Week: 118.35,
        peRatio: 58.5
      },
      {
        rank: 3,
        ticker: 'NKE',
        companyName: 'Nike Inc.',
        price: 98.45,
        change: 4.25,
        percentChange: 4.51,
        volume: '12.5M',
        marketCap: '149B',
        sparklineData: [90, 92, 94, 95, 96, 97, 98.45],
        high52Week: 135.50,
        low52Week: 70.75,
        peRatio: 28.5
      },
      {
        rank: 4,
        ticker: 'SBUX',
        companyName: 'Starbucks',
        price: 96.80,
        change: 3.85,
        percentChange: 4.14,
        volume: '10.2M',
        marketCap: '109B',
        sparklineData: [89, 91, 92, 93, 95, 96, 96.80],
        high52Week: 115.75,
        low52Week: 71.55,
        peRatio: 24.2
      },
      {
        rank: 5,
        ticker: 'MCD',
        companyName: 'McDonald\'s',
        price: 285.60,
        change: 10.45,
        percentChange: 3.80,
        volume: '4.5M',
        marketCap: '208B',
        sparklineData: [268, 272, 276, 279, 282, 284, 285.60],
        high52Week: 312.50,
        low52Week: 245.73,
        peRatio: 25.8
      }
    ],
    losers: [
      {
        rank: 1,
        ticker: 'F',
        companyName: 'Ford Motor',
        price: 10.85,
        change: -0.72,
        percentChange: -6.23,
        volume: '95.5M',
        marketCap: '43B',
        sparklineData: [12.5, 12, 11.8, 11.5, 11.2, 11, 10.85],
        high52Week: 14.85,
        low52Week: 9.63,
        peRatio: 34.5
      },
      {
        rank: 2,
        ticker: 'GM',
        companyName: 'General Motors',
        price: 42.35,
        change: -2.52,
        percentChange: -5.62,
        volume: '28.5M',
        marketCap: '50B',
        sparklineData: [48, 47, 46, 45, 44, 43, 42.35],
        high52Week: 52.75,
        low52Week: 26.85,
        peRatio: 5.8
      },
      {
        rank: 3,
        ticker: 'TGT',
        companyName: 'Target',
        price: 142.80,
        change: -7.85,
        percentChange: -5.21,
        volume: '8.5M',
        marketCap: '66B',
        sparklineData: [158, 156, 153, 150, 147, 145, 142.80],
        high52Week: 181.50,
        low52Week: 102.93,
        peRatio: 18.2
      },
      {
        rank: 4,
        ticker: 'LOW',
        companyName: 'Lowe\'s',
        price: 238.45,
        change: -11.25,
        percentChange: -4.51,
        volume: '5.2M',
        marketCap: '139B',
        sparklineData: [262, 258, 254, 250, 245, 241, 238.45],
        high52Week: 285.75,
        low52Week: 181.43,
        peRatio: 21.5
      },
      {
        rank: 5,
        ticker: 'BKNG',
        companyName: 'Booking Holdings',
        price: 3825.60,
        change: -165.40,
        percentChange: -4.14,
        volume: '582K',
        marketCap: '132B',
        sparklineData: [4150, 4100, 4050, 4000, 3950, 3890, 3825.60],
        high52Week: 4450.50,
        low52Week: 2875.35,
        peRatio: 28.5
      }
    ]
  }
};

export const marketIndices = [
  {
    symbol: '^GSPC',
    name: 'S&P 500',
    price: 5738.55,
    change: 42.80,
    percentChange: 0.75,
    sparklineData: [5650, 5670, 5690, 5710, 5720, 5730, 5738.55]
  },
  {
    symbol: '^IXIC',
    name: 'NASDAQ',
    price: 18182.92,
    change: 125.35,
    percentChange: 0.69,
    sparklineData: [18000, 18050, 18100, 18120, 18150, 18170, 18182.92]
  },
  {
    symbol: '^DJI',
    name: 'Dow Jones',
    price: 42233.05,
    change: 288.73,
    percentChange: 0.69,
    sparklineData: [41800, 41900, 42000, 42050, 42150, 42200, 42233.05]
  },
  {
    symbol: '^VIX',
    name: 'VIX',
    price: 19.45,
    change: -1.25,
    percentChange: -6.04,
    sparklineData: [22, 21.5, 21, 20.5, 20, 19.7, 19.45]
  },
  {
    symbol: '^TNX',
    name: '10Y Treasury',
    price: 4.28,
    change: 0.05,
    percentChange: 1.18,
    sparklineData: [4.15, 4.18, 4.20, 4.22, 4.25, 4.27, 4.28]
  },
  {
    symbol: 'GC=F',
    name: 'Gold',
    price: 2745.80,
    change: 18.50,
    percentChange: 0.68,
    sparklineData: [2710, 2720, 2728, 2735, 2738, 2742, 2745.80]
  },
  {
    symbol: 'BTC-USD',
    name: 'Bitcoin',
    price: 72845.32,
    change: 1285.45,
    percentChange: 1.80,
    sparklineData: [70500, 71000, 71500, 72000, 72300, 72600, 72845.32]
  }
];
