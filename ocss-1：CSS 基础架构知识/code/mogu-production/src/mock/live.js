import Mock from 'mockjs'
import {getParamsFromRestful} from '@/utils/tools'

export default {

  // 获取直播列表
  getLives: config => {
    return Mock.mock({
      "data|10": [
          {
              "avatar|+1": [
                  "https://s11.mogucdn.com/mlcdn/c45406/200316_1d19kb00gh7125k1h9gifhbfbceke_400x400.jpg_999x999.v1c0.81.webp",
                  "https://s5.mogucdn.com/mlcdn/c45406/200604_8350c9f79hg7akgejlc3ih0fkf34i_400x400.jpg_999x999.v1c0.81.webp",
                  "https://s11.mogucdn.com/mlcdn/c45406/200527_0hgj564af97eig82kkiffb43a4898_400x400.jpg_100x9999.v1c7E.70.webp"
              ],
              "name": "@cname",
              "background|+1": [
                  "https://s5.mogucdn.com/mlcdn/c45406/200206_65abi021g5ej17fc0370a9g0ikig3_960x960.jpg_640x999.v1c96.70.webp",
                  "https://s11.mogucdn.com/mlcdn/c45406/200601_2eg0aacb21gdk4lb494lbj91j55c2_1080x1440.jpg_640x999.v1c96.70.webp",
                  "https://s5.mogucdn.com/mlcdn/c45406/200728_0b71k3fgcf1b155lkc7053cccd55j_1080x1080.jpg_640x999.v1c96.70.webp"
              ],
              "watchNum": "@integer(1, 100)w",
              "liveTitle": "@ctitle",
              "goods|+1": [
                  [
                      {
                          "image": "https://s11.mogucdn.com/mlcdn/c45406/201105_5d30ll85hf39828lh2a62ak38e09d_640x960.jpg_100x100.jpg",
                          "price": "￥@integer(1, 100)"
                      },
                      {
                          "image": "https://s5.mogucdn.com/mlcdn/c45406/201015_647bbhc78i19id5g3j522a86c3lbf_640x960.jpg_100x100.jpg",
                          "price": "￥@integer(1, 100)"
                      } 
                  ],
              ],
              "id|+1": [
                  0,
                  1,
                  2
              ]
          }    
      ],
      "status": 200,
      "msg": "请求成功"
    })
  },

  // 直播间
  getLivesById: config => {
    const params = getParamsFromRestful(config.url, '/api/live/lives/:id');

    let list = '';
    
    if (params['id'] == 0) {
      list = Mock.mock({
        data: {
          "avatar": "https://s11.mogucdn.com/mlcdn/c45406/200316_1d19kb00gh7125k1h9gifhbfbceke_400x400.jpg_100x9999.v1c7E.70.webp",
          "name": "可乐姐",
          "goods": [
            {
              "image": "https://s11.mogucdn.com/mlcdn/c45406/201105_5d30ll85hf39828lh2a62ak38e09d_640x960.jpg_100x100.jpg",
              "price": "￥@integer(30, 100)"
            }
          ],
          "video": "https://hwvod.mogucdn.com/vodcq1251964405/5285890800198363387/f0.mp4",
          "isFocus": "@boolean"
        }
      })
    } else if (params['id'] == 1) {
      list = Mock.mock({
        data: {
          "avatar": "https://s5.mogucdn.com/mlcdn/c45406/200604_8350c9f79hg7akgejlc3ih0fkf34i_400x400.jpg_999x999.v1c0.81.webp",
          "name": "@cname",
          "goods": [
            {
              "image": "https://s11.mogucdn.com/mlcdn/c45406/201105_5d30ll85hf39828lh2a62ak38e09d_640x960.jpg_100x100.jpg",
              "price": "￥@integer(30, 100)"
            }
          ],
          "video": "https://hwvod.mogucdn.com/vodcq1251964405/5285890804913924517/f0.mp4",
          "isFocus": "@boolean"
        }
      })
    } else {
      list = Mock.mock({
        data: {
          "avatar": "https://s11.mogucdn.com/mlcdn/c45406/200527_0hgj564af97eig82kkiffb43a4898_400x400.jpg_999x999.v1c0.81.webp",
          "name": "@cname",
          "goods": [
            {
              "image": "https://s11.mogucdn.com/mlcdn/c45406/201105_5d30ll85hf39828lh2a62ak38e09d_640x960.jpg_100x100.jpg",
              "price": "￥@integer(30, 100)"
            }
          ],
          "video": "https://hwvod.mogucdn.com/vodcq1251964405/5285890810420970201/f0.mp4",
          "isFocus": "@boolean"
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