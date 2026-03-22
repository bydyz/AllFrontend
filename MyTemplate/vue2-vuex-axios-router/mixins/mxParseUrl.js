export default {
	methods: {
		// 获取 - 解析数据
		getDeData(json) {
			json = json || this.$route.query.json || ''

			try {
				json = JSON.parse(decodeURIComponent(decodeURIComponent(json)))
			} catch (e) {
				console.error(e)
				json = null
			}

			return json
		},

		// 获取 - 加密数据
		getEnData(json) {
			return encodeURIComponent(encodeURIComponent(JSON.stringify(json)))
		},

		// 获取 - 加密Url
		getEnUrl({ baseUrl, pathname, json }) {
			let oUrl = new URL(baseUrl)
			if (pathname) oUrl.pathname = pathname
			oUrl.searchParams.set('json', this.getEnData(json))
			return oUrl.toString()
		}
	}
}
