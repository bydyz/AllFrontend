export const RandomChineseName = () => {
  let getRandom = list => list[Math.floor(Math.random() * list.length)]
  let firstNameList = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐'
  let firstName = getRandom(firstNameList)
  let lastNameList = ' 煜轩凌容岚航宇筠渤坤瀚柏霆晟睿诚晨哲智嘉洋谦尧铭松明琛星君涵子璇瑾春一鸣晓庆佳玉诗悦天赫若萌雅涵璐美欣国贤紫亦菲雄霖情晓蕊蓉柯茁瑞娅果兴鑫恩岳岑森升珈尚延颐灵然衍暄正薪桀永琦舜澜尊楠普喆娴缘榛熳优勋滕超苡阡萸幻霈陌艾蓝瑜璐颜薰鹤莲禧隆蔚霏泰承珂璇璠嘉邦俊铭'
  let lastName1 = getRandom(lastNameList)
  let lastName2 = getRandom(lastNameList)
  return firstName + lastName1 + lastName2
}

// 获取 TCPlayer 在浏览器的支持度 ， 返回 true || false
export const getPlayerSupport = (function() {
  let De = /tbs\/(\d+) /i, ke = /OS (\d+)_(\d+)_?(\d+)?/, Ie = De.test(navigator.userAgent)
  let Ae = /UCBrowser\/(\d+)\./i.test(navigator.userAgent)
  let Oe = /safari\/(\d+)\./i.test(navigator.userAgent) && !/chrome\/(\d+)\./i.test(navigator.userAgent)
  let Me = /iPhone|iPad|iOS/i.test(navigator.userAgent)
  let je = function() {
    let e = navigator.userAgent.match(ke)
    return e && [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || '0', 10)] || []
  }
  let xe = /firefox\/(\d+)\./i.test(navigator.userAgent)

  function t(e, t, n, r) {
    return new (n || (n = Promise))((function(i, o) {
      function s(e) {
        try {
          c(r.next(e))
        } catch (e) {
          o(e)
        }
      }

      function a(e) {
        try {
          c(r.throw(e))
        } catch (e) {
          o(e)
        }
      }

      function c(e) {
        let t
        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
          e(t)
        }))).then(s, a)
      }

      c((r = r.apply(e, t || [])).next())
    }))
  }

  function n(e, t) {
    let n, r, i, o, s = {
      label: 0, sent: function() {
        if (1 & i[0]) throw i[1]
        return i[1]
      }, trys: [], ops: []
    }
    return o = {
      next: a(0),
      throw: a(1),
      return: a(2)
    }, 'function' == typeof Symbol && (o[Symbol.iterator] = function() {
      return this
    }), o

    function a(o) {
      return function(a) {
        return function(o) {
          if (n) throw new TypeError('Generator is already executing.')
          for (; s;) try {
            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i
            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
              case 0:
              case 1:
                i = o
                break
              case 4:
                return s.label++, {value: o[1], done: !1}
              case 5:
                s.label++, r = o[1], o = [0]
                continue
              case 7:
                o = s.ops.pop(), s.trys.pop()
                continue
              default:
                if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                  s = 0
                  continue
                }
                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                  s.label = o[1]
                  break
                }
                if (6 === o[0] && s.label < i[1]) {
                  s.label = i[1], i = o
                  break
                }
                if (i && s.label < i[2]) {
                  s.label = i[2], s.ops.push(o)
                  break
                }
                i[2] && s.ops.pop(), s.trys.pop()
                continue
            }
            o = t.call(e, s)
          } catch (e) {
            o = [6, e], r = 0
          } finally {
            n = i = 0
          }
          if (5 & o[0]) throw o[1]
          return {value: o[0] ? o[1] : void 0, done: !0}
        }([o, a])
      }
    }
  }

  ``

  return function(e) {
    t(void 0, void 0, void 0, (function() {
      let e, r, i
      return n(this, (function(o) {
        switch (o.label) {
          case 0:
            return e = !1, ['RTCPeerConnection', 'webkitRTCPeerConnection'].forEach((function(t) {
              e || t in window && (e = !0)
            })), Ie || (Ae && Me || Oe && Me && (0 === (r = je()).length || r[0] < 11 || 11 === r[0] && r[1] < 1 || 11 === r[0] && 1 === r[1] && r[2] < 2)) && (e = !1), [4, t(void 0, void 0, void 0, (function() {
              let e, t, r, i
              return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([0, 2, , 3]), e = new RTCPeerConnection({
                      iceServers: [],
                      sdpSemantics: 'unified-plan'
                    }), t = {}, e.addTransceiver ? (e.addTransceiver('audio', {direction: 'recvonly'}), e.addTransceiver('video', {direction: 'recvonly'})) : t = {
                      offerToReceiveVideo: !0,
                      offerToReceiveAudio: !0
                    }, [4, e.createOffer(t)]
                  case 1:
                    return r = n.sent(), i = r.sdp.toLowerCase().indexOf('h264') > -1, e.close(), [2, i]
                  case 2:
                    return n.sent(), [2, !1]
                  case 3:
                    return [2]
                }
              }))
            }))]
          case 1:
            return i = o.sent(), [2, {
              WebRTCSupport: e,
              isTbs: Ie,
              tbsVersion: Ie ? (s = navigator.userAgent, a = De, c = 1, d = s.match(a), d && d.length >= c && parseInt(d[c], 10)) : null,
              isFirefox: xe,
              isSafari: Oe,
              isIOS: Me,
              iOSVersion: Me ? je().join('.') : null,
              h264Support: i
            }]
        }
        let s, a, c, d
      }))
    })).then((function(t) {
      null == e || e(t)
    }))
  }
})()

