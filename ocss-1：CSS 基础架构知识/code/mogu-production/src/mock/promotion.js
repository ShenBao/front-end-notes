import Mock from 'mockjs'
import {getParamsFromRestful} from '@/utils/tools'

export default {

  // 今日必抢
  getHotGoods: config => {
    return Mock.mock({
      "data|3": [
        {
          "image|+1": [
            "https://s11.mogucdn.com/mlcdn/1689c6/201124_30l79fkhef54bj7fj7ab2e93bf366_640x640.jpg_240x240.v1cAC.40.webp",
            "https://s5.mogucdn.com/mlcdn/1689c6/200923_1j0f9d0hbjic8bj2gh31kf6ke77ld_640x640.jpg_240x240.v1cAC.40.webp",
            "https://s5.mogucdn.com/mlcdn/1689c6/201027_8c0jj0gh3415ec8kj42d390ba0k37_640x640.jpg_240x240.v1cAC.40.webp"
          ],
          "sell|+1": [
            "已抢15810件",
            "已抢222件",
            "已抢86件"
          ],
          "des|+1": [
            "10片草木之心冰泉玻尿酸面膜",
            "加绒连帽懒惰风韩版外套",
            "北极绒仙女暖暖裤套装加绒"
          ],
          "price|+1": [
            "￥12.9",
            "￥37.9",
            "￥22.8"
          ],
          "oldprice|+1": [
            "49",
            "99.09",
            "88.05"
          ]
        }
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 限时快抢
  getFastBuyGoods: config => {
    const params = getParamsFromRestful(config.url, '/api/promotion/fastbuy-goods/:time');

    let list = '';
    
    if (params['time'] == '00:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200705_7fl40b6c13i1h6ik6ljf41e0i6a1h_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s11.mogucdn.com/mlcdn/1689c6/201016_6f4b1l898hbik01df413igec5aa16_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "网红小白鞋女《单绒可选》",
              "半高领德绒打底衫"
            ],
            "progress|+1": [
              "8",
              "28"
            ],
            "price|+1": [
              "19.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '03:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s11.mogucdn.com/mlcdn/1689c6/201121_0i96kbebc316ija7ajj76dc7jhbej_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/201027_33l22ke0jjlb9dfjcldgc9ike68hh_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "情侣装毛衣针织衫男女同款",
              "儿童棉拖鞋秋冬季女童棉鞋"
            ],
            "progress|+1": [
              "39",
              "28"
            ],
            "price|+1": [
              "29.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '06:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200919_6i724fheg4504f3d8jad9ak36c4jh_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/201008_19bf6e0b4bf2ckg19hedh2ejjj5a2_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "冬季T恤男士打底衫",
              "加绒加厚假两件卫衣"
            ],
            "progress|+1": [
              "8",
              "28"
            ],
            "price|+1": [
              "19.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '09:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200705_7fl40b6c13i1h6ik6ljf41e0i6a1h_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s11.mogucdn.com/mlcdn/1689c6/201016_6f4b1l898hbik01df413igec5aa16_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "网红小白鞋女《单绒可选》",
              "半高领德绒打底衫"
            ],
            "progress|+1": [
              "8",
              "28"
            ],
            "price|+1": [
              "19.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '12:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s11.mogucdn.com/mlcdn/1689c6/201121_0i96kbebc316ija7ajj76dc7jhbej_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/201027_33l22ke0jjlb9dfjcldgc9ike68hh_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "情侣装毛衣针织衫男女同款",
              "儿童棉拖鞋秋冬季女童棉鞋"
            ],
            "progress|+1": [
              "39",
              "28"
            ],
            "price|+1": [
              "29.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '15:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200919_6i724fheg4504f3d8jad9ak36c4jh_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/201008_19bf6e0b4bf2ckg19hedh2ejjj5a2_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "冬季T恤男士打底衫",
              "加绒加厚假两件卫衣"
            ],
            "progress|+1": [
              "8",
              "28"
            ],
            "price|+1": [
              "19.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '18:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200705_7fl40b6c13i1h6ik6ljf41e0i6a1h_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s11.mogucdn.com/mlcdn/1689c6/201016_6f4b1l898hbik01df413igec5aa16_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "网红小白鞋女《单绒可选》",
              "半高领德绒打底衫"
            ],
            "progress|+1": [
              "8",
              "28"
            ],
            "price|+1": [
              "19.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else if (params['time'] == '21:00') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s11.mogucdn.com/mlcdn/1689c6/201121_0i96kbebc316ija7ajj76dc7jhbej_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/201027_33l22ke0jjlb9dfjcldgc9ike68hh_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "情侣装毛衣针织衫男女同款",
              "儿童棉拖鞋秋冬季女童棉鞋"
            ],
            "progress|+1": [
              "39",
              "28"
            ],
            "price|+1": [
              "29.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    } else {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200919_6i724fheg4504f3d8jad9ak36c4jh_640x640.jpg_240x240.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/201008_19bf6e0b4bf2ckg19hedh2ejjj5a2_640x640.jpg_240x240.v1cAC.40.webp"
            ],
            "title|+1": [
              "冬季T恤男士打底衫",
              "加绒加厚假两件卫衣"
            ],
            "progress|+1": [
              "8",
              "28"
            ],
            "price|+1": [
              "19.9",
              "49"
            ],
            "oldprice|+1": [
              "599",
              "149"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价"
            ]
          }
        ]
      })
    }

    return {
      status: 200,
      data: list.data,
      msg: '请求成功'
    }
  },

  // 即将售罄与我的快抢
  getPromotionGoods: config => {
    const params = getParamsFromRestful(config.url, '/api/promotion/goods/:status');

    let list = '';
    console.log(1111, params['status'])
    if (params['status'] == 'lastcrazy') {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/1689c6/200929_58612535224656243g02kecgh9lb0_640x640.jpg_240x999.v1c96.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/200827_1d3i9e9301gk45ai63gac39e3459a_640x640.jpg_240x999.v1c96.40.webp",
              "https://s11.mogucdn.com/mlcdn/1689c6/201119_63kcd4914ik9k411c2f86bed9jbg5_640x640.jpg_240x999.v1c96.40.webp"
            ],
            "title|+1": [
              "韩国方形拼接镶钻耳环",
              "小黑裙护发精油免洗修复",
              "赫本风丝绒小黑裙连衣裙"
            ],
            "progress|+1": [
              "8",
              "28",
              "45"
            ],
            "price|+1": [
              "19.9",
              "49",
              "32"
            ],
            "oldprice|+1": [
              "599",
              "149",
              "288"
            ],
            "tips|+1": [
              "近30天最低价",
              "近50天最低价",
              "近60天最低价"
            ]
          }
        ]
      })
    } else {
      list = Mock.mock({
        "data|10": [
          {
            "image|+1": [
              "https://s11.mogucdn.com/mlcdn/1689c6/201022_7l6a90djb9gkbegaleegkkil04bkd_640x640.jpg_240x999.v1c96.40.webp",
              "https://s11.mogucdn.com/mlcdn/1689c6/200819_7ik1da4kakg82eaf6h640eij8k2el_640x640.jpg_240x999.v1c96.40.webp",
              "https://s5.mogucdn.com/mlcdn/1689c6/200806_4lj0lkh54l7g5ih46b89ilehhj9h5_640x640.jpg_240x999.v1c96.40.webp"
            ],
            "title|+1": [
              "三工坊螺蛳粉300g*3袋",
              "【送牙刷+面膜】孕妇婴儿牙膏",
              "4条柠檬维C内裤莫代尔纯棉裙"
            ],
            "progress|+1": [
              "56",
              "18",
              "25"
            ],
            "price|+1": [
              "29.9",
              "39",
              "38"
            ],
            "oldprice|+1": [
              "399",
              "149",
              "288"
            ],
            "tips|+1": [
              "近20天最低价",
              "近50天最低价",
              "近60天最低价"
            ]
          }
        ]
      })
    }

    return {
      status: 200,
      data: list.data,
      msg: '请求成功'
    }
  },

  // 拒绝臃肿
  getJjyzGoods: config => {
    return Mock.mock({
      "data": {
        "hot|5": [
          {
            "image|+1": [
              "https://s10.mogucdn.com/mlcdn/c45406/201125_2jfl7bafce56de8d9k7792lbhj2j1_750x500.jpg_999x999.v1c0.81.webp",
              "https://s10.mogucdn.com/mlcdn/c45406/201125_7gl6j61g9l73e7bcfl56hikhaki5k_750x500.jpg_999x999.v1c0.81.webp",
              "https://s10.mogucdn.com/mlcdn/c45406/201125_54ik54a406alc4f000787h166129i_750x500.jpg_999x999.v1c0.81.webp",
              "https://s10.mogucdn.com/mlcdn/c45406/201125_3e7j273ke5jggejh45d9g96e5ea6e_750x500.jpg_999x999.v1c0.81.webp",
              "https://s10.mogucdn.com/mlcdn/c45406/201125_5eb3i4g30710514gje9hi067hk1ii_750x335.jpg_999x999.v1c0.81.webp"
            ],
            "id|+1": [
              "100",
              "101",
              "102",
              "103",
              "104"
            ]
          }
        ],
        "goods|10": [
          {
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/c45406/200728_00b9bjc4161b44hg476599ldj4l7g_640x750.jpg_360x360.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/201017_4lbhi4lcf0d7glca1hdd54h7gk585_640x800.jpg_360x360.v1cAC.40.webp",
            ],
            "des|+1": [
              "手工缝制大码女士双面呢纯羊毛面料双面呢韩版羊绒大衣休闲冬外套",
              "小香风米色毛呢外套女中款2020年冬季收腰显瘦气质法式呢大衣"
            ],
            "price|+1": [
              "￥286",
              "￥239"
            ],
            "oldprice|+1": [
              "￥290",
              "￥300"
            ],
            "id|+1": [
              "105",
              "106"
            ]
          }    
        ]
      },
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 运动风童鞋专场
  getYdftxGoods: config => {
    return Mock.mock({
      "data": {
        "hot|3": [
          {
            "image|+1": [
              "https://s10.mogucdn.com/mlcdn/c45406/201125_7fcg9ji7g5hh3i55i9h217l8djl26_750x500.jpg_999x999.v1c0.81.webp",
              "https://s10.mogucdn.com/mlcdn/c45406/201125_5jb0blcig46ia39912la4h6bikk74_750x500.jpg_999x999.v1c0.81.webp",
              "https://s10.mogucdn.com/mlcdn/c45406/201125_19kcab9e5ll209g8j3b6598lccih7_750x227.jpg_999x999.v1c0.81.webp"
            ],
            "id|+1": [
              "110",
              "111",
              "112"
            ]
          }
      ],
      "goods|10": [
        {
          "image|+1": [
            "https://s11.mogucdn.com/mlcdn/c45406/180927_092alg92h26jdeebhb2fh4hfh8fg5_640x960.jpg_360x360.v1cAC.40.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/201004_3c5f5ikb4jc7kbjkjaebce1h92a52_640x960.jpg_360x360.v1cAC.40.webp",
          ],
          "des|+1": [
            "芭芭鸭儿童棉鞋雪地靴加绒保暖男童二棉女童",
            "男童运动鞋秋冬款2020新款女童运动二棉加绒板鞋小白鞋儿童潮"
          ],
          "price|+1": [
            "￥53",
            "￥53"
          ],
          "oldprice|+1": [
            "￥130",
            "￥85"
          ],
          "id|+1": [
            "113",
            "114"
          ]
        }    
      ]
    },
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 秋冬配饰分享
  getQdpsfxGoods: config => {
    return Mock.mock({
      "data|10": [
        {
          "image|+1": [
            "https://s5.mogucdn.com/mlcdn/c45406/201107_4j61fbajk9aal42ce62be43gj8bgc_640x960.jpg_360x480.v1cAC.40.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/191106_5b38703h1ik108i1bg3b0cb4jhe35_640x960.jpg_360x480.v1cAC.40.webp",
          ],
          "des|+1": [
            "毛绒渔夫帽女韩版潮秋冬季百搭盆帽仿羊羔毛帽子羊羔绒冬天男保暖",
            "帽子女秋冬季甜美可爱冬天毛绒围巾一体韩版护耳保暖手套三件套潮"
          ],
          "price|+1": [
            "￥12.50",
            "￥35"
          ],
          "oldprice|+1": [
            "￥45",
            "￥99"
          ],
          "id|+1": [
            "120",
            "121"
          ]
        }    
      ],
      "status": 200,
      "msg": "请求成功"
    })
  }
}