import Mock from 'mockjs'
import {getParamsFromRestful} from '@/utils/tools'

export default {
  
  // 获取商品类目
  getCategorys: config => { 
    return Mock.mock({
      "data|20": [
        {
          "title|+1": [
            "上衣",
            "裤子",
            "裙子",
            "女鞋",
            "男友",
            "包包"
          ],
          "id|+1": [
            0,
            1,
            2,
            3,
            4,
            5
          ]
        }
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 获取某种品类
  getOneCategory: config => { 
    const params = getParamsFromRestful(config.url, '/api/mall/categorys/:id');
    let list = '';
    
    if(params['id'] == 0) {
      list = Mock.mock(
        {
          "data|30": [
            {
              "image|+1": [
                "https://s2.mogucdn.com/mlcdn/c45406/200831_65f6hij20574g1h7f5je59le49h4f_100x120.png_999x999.v1c0.81.webp",
                "https://s2.mogucdn.com/mlcdn/c45406/180910_1l7ii4gejd9g5333313gefaebbhf5_180x180.jpg_200x9999.v1c7E.81.webp",
                "https://s2.mogucdn.com/mlcdn/c45406/170823_7dkl85cdikcfd4940de030hg315il_120x120.jpg_999x999.v1c0.81.webp",
                "https://s2.mogucdn.com/mlcdn/c45406/181120_85cjh932h88f1f43f175gc6eaal7g_120x120.jpg_999x999.v1c0.81.webp"
              ],
              "des|+1": [
                "卫衣",
                "长袖T恤",
                "衬衫",
                "棉服"
              ],
              "id": 0
            }
          ],
        }
      );
    } else if(params['id'] == 1) {
      list = Mock.mock({
        "data|15": [
          {
            "image|+1": [
              "https://s17.mogucdn.com/mlcdn/c45406/200414_6jkf2ijhf2jihjk6842lab3lg4b1d_180x180.png_200x9999.v1c7E.81.webp",
              "https://s18.mogucdn.com/mlcdn/c45406/200506_65604dg7d5a6h1h86igd3h16h474h_180x180.jpg_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/200506_7hec9lkbecdbbkd19beb887285i2i_180x180.jpg_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/181105_8daff35ek786l91fgg637ek82kc7b_130x130.jpg_999x999.v1c0.81.webp"
            ],
            "des|+1": [
              "牛仔裤",
              "休闲裤",
              "阔腿裤",
              "运动裤"
            ],
            "id": 1
          }
        ]
      })
    } else if (params['id'] == 2) {
      list = Mock.mock({
        "data|15": [
          {
            "image|+1": [
              "https://s2.mogucdn.com/mlcdn/c45406/190903_2h8b9c515cacfh15f83833j6ec6fd_180x180.jpg_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/191029_1l56ag438lcbh9k3hkjgaka5ha6la_180x180.jpg_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/190903_1hbe60056b7ih269g1ih0j53a887h_179x180.jpg_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/200831_40h180aa42k0gei4l5cah9efkac90_120x150.png_999x999.v1c0.81.webp"
            ],
            "des|+1": [
              "连衣裙",
              "长款半裙",
              "短款半裙",
              "卫衣裙"
            ],
            "id": 2
          }
        ]
      })
    } else if (params['id'] == 3) {
      list = Mock.mock({
        "data|15": [
          {
            "image|+1": [
              "https://s2.mogucdn.com/mlcdn/c45406/200831_0ed9alld0aa7jfl9c9ha0913el24e_200x200.jpg_200x9999.v1c7E.81.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/200831_78iiddjh8gkh37ee25ef3408b4aa0_200x200.jpg_200x9999.v1c7E.81.webp",
              "https://s17.mogucdn.com/mlcdn/c45406/200831_6488kd4d59cdff46932llefg68lb0_200x200.jpg_200x9999.v1c7E.81.webp",
              "https://s18.mogucdn.com/mlcdn/c45406/200831_14diej29e7jk1ikbg6k4cad3a8lgb_200x200.jpg_200x9999.v1c7E.81.webp"
            ],
            "des|+1": [
              "靴子",
              "品牌精选",
              "老爹鞋",
              "休闲鞋"
            ],
            "id": 3
          }
        ]
      })
    } else if(params['id'] == 4) {
      list = Mock.mock({
        "data|15": [
          {
            "image|+1": [
              "https://s2.mogucdn.com/mlcdn/c45406/201104_1g8hhjlf6b721f17dd6hg26b2cc7f_200x200.png_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/201104_1j9531e3c19ehgec0h3hajb9gbckh_200x200.png_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/201104_1395al1bh55ceb8ibk1ig2g82fjj2_200x200.png_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/201104_6kgab2274339j6llkghcfd4b1f3a2_200x200.png_200x9999.v1c7E.81.webp"
            ],
            "des|+1": [
              "秋冬上新",
              "卫衣T恤",
              "外套",
              "休闲裤"
            ],
            "id": 4
          }
        ]
      })
    } else if(params['id'] == 5) {
      list = Mock.mock({
        "data|15": [
          {
            "image|+1": [
              "https://s18.mogucdn.com/mlcdn/c45406/190926_6j92j0d3dhdf5k30hl2ehffe9b23l_120x120.jpg_999x999.v1c0.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/190926_69a76j986i6d74760hdd44j7e9hda_120x120.jpg_999x999.v1c0.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/200509_0d3ke2e36lci55e8heibgcc1b288c_180x180.jpg_200x9999.v1c7E.81.webp",
              "https://s2.mogucdn.com/mlcdn/c45406/190926_20h05ej196j3kif9fjii33kb7d0k1_120x120.jpg_999x999.v1c0.81.webp"
            ],
            "des|+1": [
              "斜挎包",
              "单肩包",
              "手提包",
              "双肩包"
            ],
            "id": 5
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

  // 轮播图
  getBanners: config => {
    return {
      "data": [
        {
          "image": "https://s11.mogucdn.com/mlcdn/c45406/201126_0hgl23klege84596ljk0hgcc0g3f2_1060x367.jpg_750x9999.v1c7E.81.webp",
          "url": "/promotion/ydftx"
        },
        {
          "image": "https://s17.mogucdn.com/mlcdn/c45406/201125_07510jcdhelj6630a0cibl1fa5ci5_1060x367.jpg_750x9999.v1c7E.81.webp",
          "url": "/promotion/jjyz"
        },
        {
          "image": "https://s18.mogucdn.com/mlcdn/c45406/201126_0a5lh50816f213d8e1dai7kl5ij4g_1060x367.png_750x9999.v1c7E.81.webp",
          "url": "/promotion/qdpsfx"
        }
      ],
      "status": 200,
      "msg": "请求成功"
    }
  },

  // 获取所有品类视频列表
  getBrandVideos: config => {
    return Mock.mock({
      "data": [
        {
          "list|10": [
            {
              "image|+1": [
                "https://s5.mogucdn.com/mlcdn/c45406/200904_4k17kli0kd31lj47h3b15219flh05_590x1280.png_999x999.v1c0.100.webp",
                "https://s5.mogucdn.com/mlcdn/c45406/200905_0631ef6f09hdi0igkkdg1hj561e03_607x1080.jpg_400x9999.v1c7E.70.webp"
              ],
              "des|+1": [
                "甜心团队从三个人发展到现在，一路走来相互扶持相互陪伴才有了今天的成就，想到你们这么多年的感情听到你们一起唱歌忍不住泪目，希望你们友谊长存，甜心团队加油🙃🙃",
                "懒人上班上学快速出门发型✅ 啦啦啦～ 你们千呼万唤的学生党上班族手残党极速出门发型来啦！ 真的很快哈哈哈，都是一分钟内搞定哦！ 而且不扯头皮不容易散，可以维持一整天～ ✅清爽高马尾 ✅可爱丸子头 ✅俏皮半高马尾 ✅萌系双马尾 每天发型都能不重样～ 大家一起get起来吧 @蘑菇穿搭酱"
              ],
              "avatarImage|+1": [
                "https://s11.mogucdn.com/mlcdn/c45406/200723_5hf5lj0535gjjdkdk4d2kb58cbk2j_400x400.jpg_100x9999.v1c7E.70.webp",
                "https://s11.mogucdn.com/mlcdn/c45406/190914_57ed66l7dcb4cda4b827069bb5fe1_400x400.jpg_100x9999.v1c7E.70.webp"
              ],
              "avatarDes|+1": [
                "吃肉肉不长肉肉减肉肉",
                "米儿姐姐Mirror"
              ],
              "id|+1": [
                0,
                1
              ]
            }
          ]
        },
        {
          "list|10": [
            {
              "image|+1": [
                "https://s5.mogucdn.com/mlcdn/c45406/200904_137k7a0847h64i5ic6kdhk940ed4b_901x1600.jpg_400x9999.v1c7E.70.webp",
                "https://s5.mogucdn.com/mlcdn/c45406/201115_358g41i99g9a459h52ebj46a5g6ll_1080x1906.png_999x999.v1c0.100.webp"
              ],
              "des|+1": [
                "如何拥有少女感？谭松韵颜值&表情管理分析",
                "今日💄分享 稚优泉M06号色(红棕色) 绝美色号✔秋冬很🆗 国货之光✔学生党必入"
              ],
              "avatarImage|+1": [
                "https://s5.mogucdn.com/mlcdn/5abf39/181003_344fek6516dfehbca6hd7ga2h3c1d_400x400.jpg_100x9999.v1c7E.70.webp",
                "https://s5.mogucdn.com/mlcdn/c45406/190618_5395li5hc1hgfjl5kh19d57ldj6jf_400x400.jpg_100x9999.v1c7E.70.webp"
              ],
              "avatarDes|+1": [
                "陈一丁Dingslook",
                "宠小郁"
              ],
              "id|+1": [
                2,
                3
              ]
            }
          ]
        }
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 推荐类目
  getRecommendatoryCategorys: config => {
    return Mock.mock({
      "data|15": [
        {
          "image|+1": [
            "https://s10.mogucdn.com/mlcdn/c45406/201117_05a1b05j9aaf8d0a7idjgc7eih4lj_135x135.png_640x640.v1cAC.40.webp",
            "https://s10.mogucdn.com/mlcdn/c45406/200327_53b3db6jf13f45j990bfb9759e4ca_135x135.jpg_640x640.v1cAC.40.webp",
            "https://s10.mogucdn.com/mlcdn/c45406/201117_5gd071j7ddhcj5l26032l3be5f66k_135x135.png_640x640.v1cAC.40.webp",
            "https://s10.mogucdn.com/mlcdn/c45406/201112_4kgic58fk7edcediic8b9jcgh641e_135x135.png_640x640.v1cAC.40.webp",
            "https://s10.mogucdn.com/mlcdn/c45406/201102_3313di64i2bag69fek5ddbi76ka17_135x135.jpg_640x640.v1cAC.40.webp",
            "https://s10.mogucdn.com/mlcdn/c45406/200327_883914gkdb4kdc1hg8a86acea5k8d_135x135.jpg_640x640.v1cAC.40.webp"
          ],
          "title|+1": [
            "上衣",
            "裤子",
            "裙子",
            "女鞋",
            "男友",
            "包包"
          ],
          "id|+1": [
            0,
            1,
            2,
            3,
            4,
            5
          ]
        }
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 获取活动列表
  getPromotions: config => {
    return Mock.mock({
      "data|4": [
        {
          "title|+1": [
            "限时快抢",
            "热销榜单",
            "好货精选",
            "新品快抢"
          ],
          "image|+1": [
            "https://s10.mogucdn.com/mlcdn/c45406/190429_4d0jffeeefieijgkj39fgagik0i52_165x166.jpg",
            "https://s10.mogucdn.com/mlcdn/c45406/190203_2bdhlkh0l7il4hlc2jfb98kg2232k_165x165.jpg",
            "https://s10.mogucdn.com/mlcdn/c45406/190909_1i9ig5c4f0idfb2l83ejbfac9d4ke_248x248.jpg",
            "https://s10.mogucdn.com/mlcdn/c45406/190910_57052df5hb286bifhl13ed65lajfc_248x248.png"
          ],
          "path|+1": [
            "/promotion/fast-buy",
            "/promotion/fast-buy",
            "/mall/home",
            "/mall/goods?id=0&des=新品快抢"
          ]
        }
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 获取某品类视频列表
  getBrandVideosById: config => {
    const params = getParamsFromRestful(config.url, '/api/live/lives/:id');

    let list = '';
    
    if (params['id'] == 0) {
      list = Mock.mock({
        "data|10": [
          {
            "avatarImage|+1": [
              "https://s11.mogucdn.com/mlcdn/c45406/200723_5hf5lj0535gjjdkdk4d2kb58cbk2j_400x400.jpg_999x999.v1c0.81.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200916_0j1bkikjjaiche9cal4bh6bek2bdi_400x400.jpg_999x999.v1c0.81.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/191218_4l8cc3f068ce24c7a35c33fh67ic6_400x400.jpg_999x999.v1c0.81.webp"
            ],
            "avatarDes|+1": [
              "吃肉肉不长肉肉减肉肉",
              "全网颜值图鉴",
              "颜乐Joy"
            ],
            "video|+1": [
              "https://hwvod.mogucdn.com/vodtranskr1251964405/5285890807191233402/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890808103980447/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890809074838659/v.f30.mp4"
            ],
            "des|+1": [
              "甜心团队从三个人发展到现在，一路走来相互扶持相互陪伴才有了今天的成就，想到你们这么多年的感情听到你们一起唱歌忍不住泪目，希望你们友谊长存，甜心团队加油",
              "当年谁没有被罗云熙的扇舞晃了心神呢",
              "还敢吃泡面吗？因为经常吃泡面导致..."
            ],
            "info|+1": [
              "2020.09.4 01:48 | 26.8万浏览",
              "2020.09.28 10:47 | 2.4万浏览",
              "30 天前 | 1.0万浏览"
            ]
          }
        ]
      })
    } else if(params['id'] == 1) {
      list = Mock.mock({
        "data|10": [
          {
            "avatarImage|+1": [
              "https://s11.mogucdn.com/mlcdn/c45406/190914_57ed66l7dcb4cda4b827069bb5fe1_400x400.jpg_999x999.v1c0.81.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200911_4dkb2le7bl92c4ehheh3k66aeici7_400x400.jpg_999x999.v1c0.81.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200902_441aki8bdjb276dii485geiaj652c_400x400.jpg_999x999.v1c0.81.webp"
            ],
            "avatarDes|+1": [
              "米儿姐姐Mirror",
              "叶志敏发型师",
              "法缇丽好物分享"
            ],
            "video|+1": [
              "https://hwvod.mogucdn.com/vodtranscq1251964405/5285890807195369212/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890808841775722/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890808619078946/v.f30.mp4"
            ],
            "des|+1": [
              "你们千呼万唤的学生党上班族手残党极速出门发型来啦！",
              "刘海",
              "剧组的人是怎么洗护头发的？务必看完。 #法缇丽 .生姜洗发水"
            ],
            "info|+1": [
              "2020.09.4 01:48 | 26.8万浏览",
              "2020.09.28 10:47 | 2.4万浏览",
              "30 天前 | 1.0万浏览"
            ]
          }
        ]
      })
    } else if(params['id'] == 2) {
      list = Mock.mock({
        "data|10": [
          {
            "avatarImage|+1": [
              "https://s5.mogucdn.com/mlcdn/5abf39/181003_344fek6516dfehbca6hd7ga2h3c1d_400x400.jpg_999x999.v1c0.81.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200916_0j1bkikjjaiche9cal4bh6bek2bdi_400x400.jpg_999x999.v1c0.81.webp",
              "https://s5.mogucdn.com/mlcdn/5abf39/201018_21gccc736jffh2ij6ifjh0i15g1j4_132x132.jpg_999x999.v1c0.81.webp"
            ],
            "avatarDes|+1": [
              "陈一丁Dingslook",
              "全网颜值图鉴",
              "乔老师Joy"
            ],
            "video|+1": [
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890807169135576/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890808917685771/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890809252505361/v.f30.mp4"
            ],
            "des|+1": [
              "如何拥有少女感？谭松韵颜值&表情管理分析",
              " iu唱《Dolphin》～已经被哒哒哒洗脑了😂",
              "..."
            ],
            "info|+1": [
              "2020.09.4 01:48 | 26.8万浏览",
              "2020.09.28 10:47 | 2.4万浏览",
              "30 天前 | 1.0万浏览"
            ]
          }
        ]
      })
    } else {
      list = Mock.mock({
        "data|10": [
          {
            "avatarImage|+1": [
              "https://s5.mogucdn.com/mlcdn/c45406/190618_5395li5hc1hgfjl5kh19d57ldj6jf_400x400.jpg_999x999.v1c0.81.webp",
              "https://s11.mogucdn.com/mlcdn/c45406/200527_0hgj564af97eig82kkiffb43a4898_400x400.jpg_999x999.v1c0.81.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200408_19dl9011j06l7edbe20ab068k5k01_400x400.jpg_999x999.v1c0.81.webp"
            ],
            "avatarDes|+1": [
              "宠小郁",
              "小莫91",
              "sisi贺韵诗"
            ],
            "video|+1": [
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890809887763302/v.f30.mp4",
              "https://hwvod.mogucdn.com/vodtransgzp1251964405/5285890809196105758/v.f30.mp4",
              "https://upyunvod.mogucdn.com/vodtransgzp1251964405/5285890809627527996/v.f30.mp4"
            ],
            "des|+1": [
              "稚优泉M06号色(红棕色)",
              "原相机无美颜护肤～",
              "隐藏唇纹"
            ],
            "info|+1": [
              "2020.09.4 01:48 | 26.8万浏览",
              "2020.09.28 10:47 | 2.4万浏览",
              "30 天前 | 1.0万浏览"
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

  // 热门搜索
  getHotCategorys: config => {
    return Mock.mock({
      "data|5": [
        {
          "title|+1": [
            "上衣",
            "裤子",
            "裙子",
            "女鞋",
            "男友",
            "包包"
          ],
          "id|+1": [
            0,
            1,
            2,
            3,
            4,
            5
          ]
        }
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 获取某品类的所有商品
  getCategoryGoods: config => {
    const params = getParamsFromRestful(config.url, '/api/mall/goods/:id');

    let list = '';
    
    if (params['id'] == 0) {
      list = Mock.mock({
        "data|100": [
          {
            "collect|+1": [
              "289",
              "182",
              "56",
              "68"
            ],
            "des|+1": [
              "棉质刺绣网红卫衣女春夏装2020新款女装卡通宽松春秋薄款潮女",
              "棉质春季女装宽松短款长袖上衣外套新款韩版ins潮洋气卫衣女春",
              "时尚百搭韩版卫衣秋季新款字母印花长袖圆领打底衫修身显瘦T恤女",
              "棉质卫衣女士新款春秋装薄款宽松韩版潮ins春季假两件洋气上衣"
            ],
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/c45406/200821_6jeckf7ifkc185k6ceebgal9j2d14_800x800.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200223_5h755561fkahi17eb78ag6de390ck_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/190729_41l4e3490bh4312a5ga62f1c53551_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200316_2bj3gh1hb3b20a0bkfci99il7e128_640x960.jpg_360x480.v1cAC.40.webp"
            ],
            "price|+1": [
              "¥59.5",
              "¥39.5",
              "¥88.2",
              "¥19.5"
            ],
            "id": 0
          }
        ]
      })
    } else if (params['id'] == 1) {
      list = Mock.mock({
        "data|100": [
          {
            "collect|+1": [
              "289",
              "182",
              "56",
              "68"
            ],
            "des|+1": [
              "棉质刺绣网红卫衣女春夏装2020新款女装卡通宽松春秋薄款潮女",
              "棉质春季女装宽松短款长袖上衣外套新款韩版ins潮洋气卫衣女春",
              "时尚百搭韩版卫衣秋季新款字母印花长袖圆领打底衫修身显瘦T恤女",
              "棉质卫衣女士新款春秋装薄款宽松韩版潮ins春季假两件洋气上衣"
            ],
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/17f85e/201106_3d3iajdb40jlk08h6k5c1c47jd3ik_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200925_1dc25066k79b7e9lhk56jfdaia7fc_640x800.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/180830_0kcjil40l1d4cbbegd68d046f575h_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200313_7b7i6kib89g11d2ba5a3jj2c0957k_640x960.jpg_360x480.v1cAC.40.webp"
            ],
            "price|+1": [
              "¥59.5",
              "¥39.5",
              "¥88.2",
              "¥19.5"
            ],
            "id": 0
          }
        ]
      })
    } else if (params['id'] == 2) {
      list = Mock.mock({
        "data|100": [
          {
            "collect|+1": [
              "289",
              "182",
              "56",
              "68"
            ],
            "des|+1": [
              "棉质刺绣网红卫衣女春夏装2020新款女装卡通宽松春秋薄款潮女",
              "棉质春季女装宽松短款长袖上衣外套新款韩版ins潮洋气卫衣女春",
              "时尚百搭韩版卫衣秋季新款字母印花长袖圆领打底衫修身显瘦T恤女",
              "棉质卫衣女士新款春秋装薄款宽松韩版潮ins春季假两件洋气上衣"
            ],
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/17f85e/201111_49l6dbi67ikbldikk0fag2gdci7ch_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/190924_6dlj1f3gfc4251f004jdba4e6j3cc_3332x4999.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200923_1l1e56ee83c3160k77eh245b6hddh_800x800.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/201014_1edl3690ff816j3lbl0gikag66g83_3999x5999.jpg_360x480.v1cAC.40.webp"
            ],
            "price|+1": [
              "¥59.5",
              "¥39.5",
              "¥88.2",
              "¥19.5"
            ],
            "id": 0
          }
        ]
      })
    } else if (params['id'] == 3) {
      list = Mock.mock({
        "data|100": [
          {
            "collect|+1": [
              "289",
              "182",
              "56",
              "68"
            ],
            "des|+1": [
              "棉质刺绣网红卫衣女春夏装2020新款女装卡通宽松春秋薄款潮女",
              "棉质春季女装宽松短款长袖上衣外套新款韩版ins潮洋气卫衣女春",
              "时尚百搭韩版卫衣秋季新款字母印花长袖圆领打底衫修身显瘦T恤女",
              "棉质卫衣女士新款春秋装薄款宽松韩版潮ins春季假两件洋气上衣"
            ],
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/c45406/200929_123a9hcii8lhh804ckb239729dc37_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/191015_0lc100i03b74g58d1i6ibck0f23ki_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/200714_2ii4gdh418dg6a80afc99ae4eg14c_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/191130_16eif047k047d9jld1ld82ddbcgb4_640x960.jpg_360x480.v1cAC.40.webp"
            ],
            "price|+1": [
              "¥59.5",
              "¥39.5",
              "¥88.2",
              "¥19.5"
            ],
            "id": 0
          }
        ]
      })
    } else if (params['id'] == 4) {
      list = Mock.mock({
        "data|100": [
          {
            "collect|+1": [
              "289",
              "182",
              "56",
              "68"
            ],
            "des|+1": [
              "棉质刺绣网红卫衣女春夏装2020新款女装卡通宽松春秋薄款潮女",
              "棉质春季女装宽松短款长袖上衣外套新款韩版ins潮洋气卫衣女春",
              "时尚百搭韩版卫衣秋季新款字母印花长袖圆领打底衫修身显瘦T恤女",
              "棉质卫衣女士新款春秋装薄款宽松韩版潮ins春季假两件洋气上衣"
            ],
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/c45406/191017_6egj888ii44176dbgb5kg2c4j7dk2_800x800.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/190916_4j80c2e8kkjh58g3l13438flda1l6_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/190728_66h458ca3kc4e2ihg9059i2i1gj3g_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/201018_4d9l5aeb856ffg1d63861gbi4123c_640x960.jpg_360x480.v1cAC.40.webp"
            ],
            "price|+1": [
              "¥59.5",
              "¥39.5",
              "¥88.2",
              "¥19.5"
            ],
            "id": 0
          }
        ]
      })
    } else {
      list = Mock.mock({
        "data|100": [
          {
            "collect|+1": [
              "289",
              "182",
              "56",
              "68"
            ],
            "des|+1": [
              "棉质刺绣网红卫衣女春夏装2020新款女装卡通宽松春秋薄款潮女",
              "棉质春季女装宽松短款长袖上衣外套新款韩版ins潮洋气卫衣女春",
              "时尚百搭韩版卫衣秋季新款字母印花长袖圆领打底衫修身显瘦T恤女",
              "棉质卫衣女士新款春秋装薄款宽松韩版潮ins春季假两件洋气上衣"
            ],
            "image|+1": [
              "https://s5.mogucdn.com/mlcdn/c45406/201114_1b5b4179ji2ef321g9081c5679jb1_800x800.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/201114_6bj9heeh7a8k5bj4j4a60f54i33l4_800x800.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/55cf19/200715_512eah8441h8ij6gal25g8i36hb71_640x960.jpg_360x480.v1cAC.40.webp",
              "https://s5.mogucdn.com/mlcdn/c45406/190621_0iekg1l1keg32alffhgcc419bk872_640x960.jpg_360x480.v1cAC.40.webp"
            ],
            "price|+1": [
              "¥59.5",
              "¥39.5",
              "¥88.2",
              "¥19.5"
            ],
            "id": 0
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

  // 搜索
  getGoodsId: config => {
    const params = getParamsFromRestful(config.url, '/api/mall/goods-id/:name');

    let data = '';
    
    if (params['name'] == 0) {
      data = {
        id: 0
      }
    } else if (params['name'] == 1) {
      data = {
        id: 1
      }
    } else if (params['name'] == 2) {
      data = {
        id: 2
      }
    } else if (params['name'] == 3) {
      data = {
        id: 3
      }
    } else if (params['name'] == 4) {
      data = {
        id: 4
      }
    } else {
      data = {
        id: 5
      }
    } 

    return {
      status: 200,
      data: data,
      msg: '请求成功'
    }
  },

  // 商品详情
  getGoodsDetailById: config => {
    const params = getParamsFromRestful(config.url, '/api/live/lives/:id');

    let list = '';
    
    if (params['id'] == 113) {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s11.mogucdn.com/mlcdn/c45406/190915_64g4585jc87edkib2ih00ldfflkf4_800x1200.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/190915_6bdbkhh0fhb8kkebdlibgbjjccif5_800x1200.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/190915_3dg5bcj5d30ccedf445a2h445c0fe_800x1200.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/190915_5j1fi49hf3f8g8bg19lhha06a224l_781x1170.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s11.mogucdn.com/mlcdn/c45406/190915_5b10c5leie5g66bhb40ak16el8k15_790x1342.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/190915_07hhc7i2f261ie66576ik1c58c28f_790x1221.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/190915_84h8194igjee94a4kb67l5l02b1gi_790x1241.jpg_468x468.webp"
          ]
        }
      })
    
    } else if (params['id'] == 114) {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s11.mogucdn.com/mlcdn/55cf19/201028_77d7a81c7baibh539d9d9be7kdd56_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/55cf19/201028_29f8c2alafc6bli7eh9gbaa11500d_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/55cf19/201028_2b1l9b2lcl36b467i8649297fdjli_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/55cf19/201028_41942d7i6715g362gg2d5940jia0l_640x960.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s5.mogucdn.com/mlcdn/c45406/201028_32175j6i0di4dcfj0aa01hj06aaci_750x819.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201028_5h122je78fa000h2kek80he502f70_750x617.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201028_6d3digi3b5adb8a79c12dk33gg2fh_750x839.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/201028_4a556fj14b5d2g6i7c2i9hkek5749_750x606.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/201028_3i1h45ebb6e1i6a2cai8e0jdalbbd_750x832.jpg_468x468.webp"
          ]
        }
      })
    } else if (params['id'] == 105) {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s5.mogucdn.com/mlcdn/c45406/180907_5e5laa11a26533lg3ik22kca7g9i5_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/180907_0c6jheh7g3k5hjge8afadibkcdhj1_640x960.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s11.mogucdn.com/mlcdn/c45406/180907_345k58fgblhhha1cbf5d0g8j1f1l6_750x850.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/180907_6fg3ab7457b6fe2c1ab4afe7d3gj9_750x850.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/180907_4484d4d99deij7jc1427i63g258ak_750x850.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/180907_4670aj951k4892ehi8g0lc7c201c6_750x850.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/180907_86ei62ih57041l5jb625l79kj44h5_750x850.jpg_468x468.webp"
          ]
        }
      })
    } else if (params['id'] == 106) {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s5.mogucdn.com/mlcdn/c45406/201004_5lf2771h7hdcb117f0e7ef3hfc6j2_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201004_6h9akki47ll5d2b3f48j69e127gj5_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201004_89d5i09407jla8gl1k540e117hjii_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/201004_8466418hdl007b9befgl7j5a9f5kl_640x960.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s5.mogucdn.com/mlcdn/c45406/201004_11ecbgagaa39ee9eib4b88hc6a53i_750x1077.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201004_7j479gd8541fe289d9c6l0f59j897_750x1083.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/201004_707e5kaj8fglc7da2b4e5j3b3ahck_750x1083.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201004_2l4hl2l949fff40k18e2c99d1hc0b_750x1080.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/201004_3g1ja0jbf6jee5ck1a7djhac8k84d_750x1080.jpg_468x468.webp"
          ]
        }
      })
    } else if (params['id'] == 120) {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s11.mogucdn.com/mlcdn/c45406/181128_7k91b6lgbh66d665k604hgk6ab1kc_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/181128_813decflhjd64l7a8i1jc0d074297_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181128_8g22da6f4bffd5gjck379331621c8_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181128_1i81gdljgb2d67j60a616df8d09ek_640x960.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s11.mogucdn.com/mlcdn/c45406/181128_5cdg17cef17i821g9ekb8ded3479g_790x1134.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181128_0e6d75hbf75e8c08621ckil2e1akj_790x1449.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181128_2iaebg39ij6e3ia67gigehk31618c_790x1053.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181128_3349kce0hba6ahkblfjb6f0ah7l96_790x1302.jpg_468x468.webp"
          ]
        }
      })
    } else if (params['id'] == 121) {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s5.mogucdn.com/mlcdn/c45406/181212_04g3djdli2l5hddl6870eb2969226_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/181212_6f1dcl3d1j1a7kk5bb8l076f5fef8_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/181212_012ed172b71bei281cg04lfig5g50_640x960.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181212_33kkh51b533kgc96l17e4g2523aak_640x960.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s11.mogucdn.com/mlcdn/c45406/181212_3f985d2e0d8d2ch6deg52i0388ddc_790x1059.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/181212_1i2fef9c261hl0kle21g24439a94c_790x1212.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/181212_16l531gg8k7lhbh9kag071l6103ki_790x906.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/181212_1j2ch2d6041ka3lhj8ei868e72j4c_790x786.jpg_468x468.webp"
          ]
        }
      })
    } else {
      list = Mock.mock({
        "data": {
          "banners": [
            "https://s11.mogucdn.com/mlcdn/c45406/191010_8034k7d2hkldg1eh832i87l5k5gfc_640x853.jpg_640x960.v1cAC.70.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/191010_6i667g6c70ejajk504j2jk95lbk20_640x854.jpg_640x960.v1cAC.70.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/191010_434c7ijha4j45i303a27g9dlj51c7_640x853.jpg_640x960.v1cAC.70.webp"
          ],
          "price": "@integer(30, 100)",
          "oldprice": "￥@integer(100, 300)",
          "title": "@cparagraph",
          "discount": "@integer(1, 9)折",
          "picture": [
            "https://s5.mogucdn.com/mlcdn/c45406/191010_8a8g9jj8fkil9lchl7kajke7l6f9a_750x306.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/191010_4613i99kg95k9lgclkcfj55kf4a2g_750x786.jpg_468x468.webp",
            "https://s5.mogucdn.com/mlcdn/c45406/191010_2hejb4l2ad75e9fj9efc7623cd9i5_750x744.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/191010_4jjj5cb49dhka3ldhcicl377bkkb0_750x756.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/191010_16ejaeiil4gdk6jfc143j699lc066_750x810.jpg_468x468.webp",
            "https://s11.mogucdn.com/mlcdn/c45406/191010_134h9232j6gl2g7kbec87adg7c7gc_750x762.jpg_468x468.webp"
          ]
        }
      })
    }

    return {
      status: 200,
      data: list.data,
      msg: '请求成功'
    }
  }
}