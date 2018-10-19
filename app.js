//app.js
App({
  onLaunch: function () { //监听小程序初始化
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }),
    wx.getSystemInfo({
      success:  (res)=> {

      },
    }),
    //调用初始时间函数
    this.initDateTime()
  },
  onShow: function () { //监听小程序显示
  },
  globalData: {
    userInfo: null,
    roomNumArr: [1,2,3,4,5,6,7,8,9,10],
    roomNumIndex: 0,
    adultNumArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    adultNumIndex: 1,
    childNumArr: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    childNumIndex: 0,
    checkInDate: null,
    checkOutDate: null,
    checkInValue: null,
    checkOutValue: null,
    checkInMonthDate: null,
    checkOutMonthDate: null,
    stayNights: 1,
    destination: '输入目的地开始搜索',
    index_intro_data: [
      {
        id: 1,
        city: '北京',
        name: '北京千禧大酒店',
        price: '780',
        oldPrice: '4570',
        off: '-25%',
        deadline: '2018-10-31',
        star: '',
        pic: '/assets/images/city1.jpg',
        latitude: '116.465838',
        longitude: '39.92275',
        hotel_intro:'北京千禧大酒店豪华而典雅，位于北京财富中心，紧邻中央电视台新总部，提供室内游泳池、舒缓放松的Spa理疗服务、4个餐饮场所、覆盖各处的免费网络以及免费停车场。...',
        address_en: 'Fortune Piaza No.7 DongSanHuan Middle Road',
        address_cn: '东三环中路7号',
        score: '8.5',
        comment: '2065',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_2.jpg'
          },
        ]
      },
      {
        id: 2,
        city: '香港',
        name: '富荟湾仔酒店',
        price: '1261',
        oldPrice: '4570',
        off: '-38%',
        deadline: '2018-12-31',
        star: '',
        pic: '/assets/images/city3.png',
        longitude: '22.274750',
        latitude: '114.180910',
        hotel_intro: '富荟湾仔酒店设有24小时健身中心，距离湾仔地铁站有5分钟的步行路程，距离铜锣湾地铁站有10分钟步行路程，提供带免费WiFi的时尚的客房，靠近娱乐区。...',
        address_en: '211 Johnston Road, Wan Chai, Hong Kong, Hong Kong',
        address_cn: '211 Johnston Road, 湾仔区, 香港, 香港特别行政区',
        score: '7.7',
        comment: '1266',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 3,
        city: '东京',
        name: '新高轮格兰王子大饭店',
        price: '1209',
        oldPrice: '4570',
        off: null,
        deadline: '2018-11-23',
        star: '',
        pic: '/assets/images/city2.jpg',
        longitude: '22.274750',
        latitude: '114.180910',
        hotel_intro: 'Grand Prince Hotel New Takanawa酒店由村野藤吾设计，地处一座5英亩（2公顷）的日式花园旁，提供宽敞的带阳台客房。酒店距离品川站有5分钟步行路程，提供多间餐厅...',
        address_en: '108-8612 Tokyo Prefecture, Minato-ku, Takanawa 3-13-1, Japan',
        address_cn: '108-8612 东京都, Minato-ku, Takanawa 3-13-1, 日本',
        score: '8.5',
        comment: '1595',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 4,
        city: '上海',
        name: '上海中航泊悦酒店（中国国际航空公司）',
        price: '653',
        oldPrice: '4570',
        off: null,
        deadline: '2018-10-31',
        star: '',
        pic: '/assets/images/city1.jpg',
        longitude: '31.192288',
        latitude: '121.328208',
        hotel_intro: '上海中航泊悦酒店（中国国际航空公司） 位于虹桥机场2号航站楼，是中国第一家提供独家机场登记入住服务的酒店。酒店内各处均提供免费无线网络连接，距离虹桥火车站和虹桥机场地铁站（2号线和10号线）仅有几步之遥...',
        address_en: ' No 181, Shen Da San Road （inside Hongqiao Airport, Terminal 2), Minhang, 200335 Shanghai, China',
        address_cn: '上海, 闵行区, 虹桥机场申达三路181号(虹桥机场2号航站楼出发2号门）',
        score: '8.3',
        comment: '1134',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_3.jpg'
          },
        ]
      },
      {
        id: 5,
        city: '台北',
        name: '洛碁大饭店南港馆',
        price: '606',
        oldPrice: '4570',
        off: null,
        deadline: '2018-12-26',
        star: '',
        pic: '/assets/images/city3.png',
        longitude: '31.192288',
        latitude: '121.328208',
        hotel_intro: '洛碁大饭店南港馆位于台北市南港区，距离捷运南港车站（2号出口）有5分钟的步行路程，提供覆盖各处的免费WiFi和私人停车场。客房配有平板有线电视瓶装水、电热水壶、带电子浴盆、浴缸和步入式淋浴间的私人浴室、拖鞋、免费洗浴用品以及吹风机。...',
        address_en: 'No. 528, Section 7, Zhongxiao East Road, Nangang District, 115 Taipei, Taiwan ',
        address_cn: '忠孝东路7段528号, 南港区, 115 台北, 中国台湾',
        score: '8.4',
        comment: '1466',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 6,
        city: '罗马',
        name: '皮拉姆温馨酒店',
        price: '3823',
        oldPrice: '4570',
        off: null,
        deadline: '2018-11-30',
        star: '',
        pic: '/assets/images/city2.jpg',
        latitude: '',
        longitude: '',
        hotel_intro: 'Welcome Piram Hotel酒店距离特米尼火车站（Termini Train Station）有200米，拥有一间餐厅、Spa区和带液晶卫星电视的空调客房和套房，还提供免费Wifi。Piram酒店的所有客房和套房均拥有大型窗户，提供迷你吧以及带吹风机和洗浴用品的私人大理石浴室。...',
        address_en: 'Via Giovanni Amendola 7, Central Station, 00185 Rome, Italy',
        address_cn: 'Via Giovanni Amendola 7, 中央火车站, 00185 罗马, 意大利',
        score: '8.3',
        comment: '4846',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      }
    ],
    index_hot_data: [
      {
        id: 1,
        city: '清迈',
        off: '-45%',
        pic: '/assets/images/city1.jpg'
      },
      {
        id: 2,
        city: '台北',
        off: '-48%',
        pic: '/assets/images/city2.jpg'
      },
      {
        id: 3,
        city: '伦敦',
        off: '-38%',
        pic: '/assets/images/city1.jpg'
      },
      {
        id: 4,
        city: '上海',
        off: '-30%',
        pic: '/assets/images/city3.png'
      },
      {
        id: 5,
        city: '上海',
        off: '-30%',
        pic: '/assets/images/city2.jpg'
      },
      {
        id: 6,
        city: '伦敦',
        off: '-38%',
        pic: '/assets/images/city1.jpg'
      },
      {
        id: 7,
        city: '台北',
        off: '-48%',
        pic: '/assets/images/city3.png'
      },
      {
        id: 8,
        city: '清迈',
        off: '-45%',
        pic: '/assets/images/city2.jpg'
      },
      {
        id: 9,
        city: '上海',
        off: '-30%',
        pic: '/assets/images/city1.jpg'
      },
      {
        id: 10,
        city: '抚松县',
        off: '-34%',
        pic: '/assets/images/city2.jpg'
      }
    ],
    index_about_data: [
      {
        id: 1,
        desc: [
          '1,096,494家住宿遍全球',
          '227个国家和地区96,749个目的地'
        ],
        icon: '/assets/images/icons/icon5.jpg'
      },
      {
        id: 2,
        desc: [
          '109,130,000条真实住客点评',
          '真实入住体验帮你挑选最心仪的住宿'
        ],
        icon: '/assets/images/icons/icon6.jpg'
      },
      {
        id: 3,
        desc: [
          '随时随地，在你身边',
          '订单支持自助修改，7天24小时客服助你安心出行'
        ],
        icon: '/assets/images/icons/icon7.jpg'
      },
    ],
    city_data: [
      {
        id: 1,
        city: '曼谷',
        country: '泰国'
      },
      {
        id: 2,
        city: '清迈',
        country: '泰国'
      },
      {
        id: 3,
        city: '台北',
        country: '台湾'
      },
      {
        id: 4,
        city: '伦敦',
        country: '英国'
      },
      {
        id: 5,
        city: '上海',
        country: '中国'
      },
      {
        id: 6,
        city: '广州',
        country: '中国'
      },
      {
        id: 7,
        city: '北京',
        country: '中国'
      },
      {
        id: 8,
        city: '巴黎',
        country: '法国'
      },
      {
        id: 9,
        city: '香港',
        country: '香港特别行政区'
      },
      {
        id: 10,
        city: '首尔',
        country: '韩国'
      },
      {
        id: 11,
        city: '澳门',
        country: '澳门特别行政区'
      },
    ],
    hotel_data: [
      {
        id: 1,
        city: '北京',
        name: '北京千禧大酒店',
        price: '780',
        oldPrice: '4570',
        off: '-25%',
        deadline: '2018-10-31',
        star: '',
        pic: '/assets/images/city1.jpg',
        latitude: '116.465838',
        longitude: '39.92275',
        hotel_intro: '北京千禧大酒店豪华而典雅，位于北京财富中心，紧邻中央电视台新总部，提供室内游泳池、舒缓放松的Spa理疗服务、4个餐饮场所、覆盖各处的免费网络以及免费停车场。...',
        address_en: 'Fortune Piaza No.7 DongSanHuan Middle Road',
        address_cn: '东三环中路7号',
        score: '8.5',
        comment: '2065',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_2.jpg'
          },
        ]
      },
      {
        id: 2,
        city: '香港',
        name: '富荟湾仔酒店',
        price: '1261',
        oldPrice: '4570',
        off: '-38%',
        deadline: '2018-12-31',
        star: '',
        pic: '/assets/images/city3.png',
        longitude: '22.274750',
        latitude: '114.180910',
        hotel_intro: '富荟湾仔酒店设有24小时健身中心，距离湾仔地铁站有5分钟的步行路程，距离铜锣湾地铁站有10分钟步行路程，提供带免费WiFi的时尚的客房，靠近娱乐区。...',
        address_en: '211 Johnston Road, Wan Chai, Hong Kong, Hong Kong',
        address_cn: '211 Johnston Road, 湾仔区, 香港, 香港特别行政区',
        score: '7.7',
        comment: '1266',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 3,
        city: '东京',
        name: '新高轮格兰王子大饭店',
        price: '1209',
        oldPrice: '4570',
        off: '-20%',
        deadline: '2018-11-23',
        star: '',
        pic: '/assets/images/city2.jpg',
        longitude: '22.274750',
        latitude: '114.180910',
        hotel_intro: 'Grand Prince Hotel New Takanawa酒店由村野藤吾设计，地处一座5英亩（2公顷）的日式花园旁，提供宽敞的带阳台客房。酒店距离品川站有5分钟步行路程，提供多间餐厅...',
        address_en: '108-8612 Tokyo Prefecture, Minato-ku, Takanawa 3-13-1, Japan',
        address_cn: '108-8612 东京都, Minato-ku, Takanawa 3-13-1, 日本',
        score: '8.5',
        comment: '1595',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 4,
        city: '上海',
        name: '上海中航泊悦酒店（中国国际航空公司）',
        price: '653',
        oldPrice: '4570',
        off: '-40%',
        deadline: '2018-10-31',
        star: '',
        pic: '/assets/images/city1.jpg',
        longitude: '31.192288',
        latitude: '121.328208',
        hotel_intro: '上海中航泊悦酒店（中国国际航空公司） 位于虹桥机场2号航站楼，是中国第一家提供独家机场登记入住服务的酒店。酒店内各处均提供免费无线网络连接，距离虹桥火车站和虹桥机场地铁站（2号线和10号线）仅有几步之遥...',
        address_en: ' No 181, Shen Da San Road （inside Hongqiao Airport, Terminal 2), Minhang, 200335 Shanghai, China',
        address_cn: '上海, 闵行区, 虹桥机场申达三路181号(虹桥机场2号航站楼出发2号门）',
        score: '8.3',
        comment: '1134',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_3.jpg'
          },
        ]
      },
      {
        id: 5,
        city: '台北',
        name: '洛碁大饭店南港馆',
        price: '606',
        oldPrice: '4570',
        off: '-12%',
        deadline: '2018-12-26',
        star: '',
        pic: '/assets/images/city3.png',
        longitude: '31.192288',
        latitude: '121.328208',
        hotel_intro: '洛碁大饭店南港馆位于台北市南港区，距离捷运南港车站（2号出口）有5分钟的步行路程，提供覆盖各处的免费WiFi和私人停车场。客房配有平板有线电视瓶装水、电热水壶、带电子浴盆、浴缸和步入式淋浴间的私人浴室、拖鞋、免费洗浴用品以及吹风机。...',
        address_en: 'No. 528, Section 7, Zhongxiao East Road, Nangang District, 115 Taipei, Taiwan ',
        address_cn: '忠孝东路7段528号, 南港区, 115 台北, 中国台湾',
        score: '8.4',
        comment: '1466',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 6,
        city: '罗马',
        name: '皮拉姆温馨酒店',
        price: '3823',
        oldPrice: '4570',
        off: '-33%',
        deadline: '2018-11-30',
        star: '',
        pic: '/assets/images/city2.jpg',
        latitude: '',
        longitude: '',
        hotel_intro: 'Welcome Piram Hotel酒店距离特米尼火车站（Termini Train Station）有200米，拥有一间餐厅、Spa区和带液晶卫星电视的空调客房和套房，还提供免费Wifi。Piram酒店的所有客房和套房均拥有大型窗户，提供迷你吧以及带吹风机和洗浴用品的私人大理石浴室。...',
        address_en: 'Via Giovanni Amendola 7, Central Station, 00185 Rome, Italy',
        address_cn: 'Via Giovanni Amendola 7, 中央火车站, 00185 罗马, 意大利',
        score: '8.3',
        comment: '4846',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 7,
        city: '曼谷',
        name: 'Rambuttri Village Plaza（拉姆布特里村广场旅店）',
        price: '567',
        oldPrice: '999',
        off: '-56%',
        deadline: '2018-12-25',
        star: '',
        pic: '/assets/images/city4.jpg',
        latitude: '',
        longitude: '',
        hotel_intro: 'Rambuttri Village Plaza酒店位于曼谷历史悠久的Rattanakosin District区，距离Khaosan Road路有5分钟步行路程，四周环绕着文化场所和活动，设有2个屋顶游泳池。Rambuttri Village Plaza酒店距离Suvarnabhumi Airport机场37公里，距离著名的Wat Phra Kaew寺和Wat Pho寺以及玉佛（The Emerald Buddha）数步之遥...',
        address_en: '95 Soi Ram Buttri, Chakkra Phong Road, Phra Nakorn, 10200 Bangkok, Thailand',
        address_cn: '95 Soi Ram Buttri, Chakkra Phong Road, Phra Nakorn, 10200 曼谷, 泰国 ',
        score: '7.7',
        comment: '16,025',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      {
        id: 8,
        city: '曼谷',
        name: 'Eastin Grand Hotel Sathorn（易思廷大酒店沙吞）',
        price: '2847',
        oldPrice: '3866',
        off: '-45%',
        deadline: '2018-12-25',
        star: '',
        pic: '/assets/images/city5.jpg',
        latitude: '',
        longitude: '',
        hotel_intro: '奢华的Eastin Grand Hotel Sathorn酒店通过其自己的天桥（Sky Bridge）与苏叻沙克BTS空中列车站（Surasak BTS Skytrain Station）相连，提供室外无边泳池、设施齐全的健身中心、3个用餐场所以及免费WiFi...',
        address_en: '33/1 South Sathorn Road, Yanawa, Sathorn , Sathorn, 10120 Bangkok, Thailand',
        address_cn: '33/1 South Sathorn Road, Yanawa, Sathorn , 沙吞, 10120 曼谷, 泰国',
        score: '9.3',
        comment: '5824',
        picList: [
          {
            id: 1,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 2,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 3,
            pic: '/assets/images/details/detail_3.jpg'
          },
          {
            id: 4,
            pic: '/assets/images/details/detail_4.jpg'
          },
          {
            id: 5,
            pic: '/assets/images/details/detail_1.jpg'
          },
          {
            id: 6,
            pic: '/assets/images/details/detail_2.jpg'
          },
          {
            id: 7,
            pic: '/assets/images/details/detail_4.jpg'
          },
        ]
      },
      
    ]
  },

  /**
 * 客房数量改变
*/
  roomNumChange: function (e) {
    this.globalData.roomNumIndex = e.detail.value;
  },

  /**
   * 成人数量改变
  */
  adultNumChange: function (e) {
    this.globalData.adultNumIndex = e.detail.value;
  },

  /**
   * 儿童数量改变
  */
  childNumChange: function (e) {
    this.globalData.childNumIndex = e.detail.value;
  },
  /**
   * 时间过滤器函数
   * dateTime: 时间参数，初始值当前时间
   * addDay: 当前时间增加几天，初始值0
  */
  dateTimeFilter: function(dateTime=new Date(), addDay=0) {
    let dayArr = ['日', '一', '二', '三', '四', '五', '六'];
    addDay = (1000*60*60*24) * addDay;
    if(typeof dateTime != 'undefined'){
      dateTime = new Date(dateTime);
    }
    dateTime = new Date(dateTime.getTime() + addDay);
    let y = dateTime.getFullYear();
    let m = dateTime.getMonth() + 1;
    let date = dateTime.getDate();
    let day = dateTime.getDay();
    let result = [];
    result['value'] = `${y}-${m}-${date}`;
    result['filterValue'] = `${m}月${date}日星期${dayArr[day]}`;
    result['month_date'] = `${m}月${date}日`;
    return result;
  },
  /**
   * 初始日期时间
  */
  initDateTime: function() {
    let checkInDate = this.dateTimeFilter().filterValue;
    let checkOutDate = this.dateTimeFilter(new Date(),1).filterValue;
    let checkInValue = this.dateTimeFilter().value;
    let checkOutValue = this.dateTimeFilter(new Date(),1).value;
    let checkInMonthDate = this.dateTimeFilter().month_date;
    let checkOutMonthDate = this.dateTimeFilter(new Date(),1).month_date;
    this.globalData.checkInDate = checkInDate;
    this.globalData.checkOutDate = checkOutDate;
    this.globalData.checkInValue = checkInValue;
    this.globalData.checkOutValue = checkOutValue;
    this.globalData.checkInMonthDate = checkInMonthDate;
    this.globalData.checkOutMonthDate = checkOutMonthDate;
    this.stayNightsChange(checkInValue,checkOutValue);
  },
  /**
   * 入住日期改变
  */
  checkInChange: function(dateTime){
    let result = this.dateTimeFilter(dateTime);
    this.globalData.checkInDate = result.filterValue;
    this.globalData.checkInValue = result.value;
    this.globalData.checkInMonthDate = result.month_date;
    return result;
  },
  /**
   * 退房日期改变
  */
  checkOutChange: function(dateTime){
    let result = this.dateTimeFilter(dateTime);
    this.globalData.checkOutDate = result.filterValue;
    this.globalData.checkOutValue = result.value;
    this.globalData.checkOutMonthDate = result.month_date;  
    return result;
  },
  /**
   * 计算入住晚数
  */
  stayNightsChange: function(start,end){
    start = new Date(start).getTime();
    end = new Date(end).getTime();
    if(start >= end){
      wx.showToast({
        title: '日期选择错误',
        duration: 2000,
        icon: 'loading'
      })
      return;
    }
    let difference = end - start;
    let stayNights = parseInt(difference / (1000*60*60*24));
    this.globalData.stayNights = stayNights;
    return stayNights;
  },
  /**
   * 目的地改变
  */
  destinationChange: function(id,city){
    this.globalData.destination = city;
    return this.globalData.destination;
  }
})