import axios from 'axios'
import cryptoJs from 'crypto-js'
import { HttpsProxyAgent } from 'https-proxy-agent'

export const getProxy = () => {
    const proxies = [
        '188.166.30.17:8888',
        '37.120.133.137:3128',
        '37.120.222.132:3128',
        '89.249.65.191:3128',
        '144.91.118.176:3128',
        '95.216.17.79:3888',
        '85.214.94.28:3128',
        '185.123.143.251:3128',
        '167.172.109.12:39452',
        '176.113.73.104:3128',
        '51.158.68.133:8811',
        '185.123.143.247:3128',
        '95.111.226.235:3128',
        '176.113.73.99:3128',
        '206.189.130.107:8080',
        '79.110.52.252:3128',
        '13.229.107.106:80',
        '118.99.108.4:8080',
        '13.229.47.109:80',
        '169.57.157.148:80',
        '51.158.68.68:8811',
        '167.172.109.12:40825',
        '119.81.189.194:80',
        '119.81.189.194:8123',
        '3.24.178.81:80',
        '119.81.71.27:80',
        '119.81.71.27:8123',
        '185.236.203.208:3128',
        '193.239.86.249:3128',
        '159.8.114.37:80',
        '185.123.101.174:3128',
        '222.129.38.21:57114',
        '185.236.202.205:3128',
        '193.56.255.179:3128',
        '35.180.188.216:80',
        '106.45.221.168:3256',
        '113.121.240.114:3256',
        '193.34.95.110:8080',
        '84.17.51.235:3128',
        '180.183.97.16:8080',
        '193.239.86.247:3128',
        '185.189.112.157:3128',
        '121.206.205.75:4216',
        '103.114.53.2:8080',
        '139.180.140.254:1080',
        '84.17.51.241:3128',
        '84.17.51.240:3128',
        '185.189.112.133:3128',
        '81.12.119.171:8080',
        '37.120.140.158:3128',
        '159.89.113.155:8080',
        '104.248.146.99:3128',
        '185.236.202.170:3128',
        '67.205.190.164:8080',
        '46.21.153.16:3128',
        '51.158.172.165:8811',
        '84.17.35.129:3128',
        '85.214.244.174:3128',
        '104.248.59.38:80',
        '12.156.45.155:3128',
        '161.202.226.194:8123',
        '167.172.109.12:41491',
        '167.172.109.12:39533',
        '115.221.242.131:9999',
        '125.87.82.86:3256',
        '159.8.114.37:8123',
        '183.164.254.8:4216',
        '169.57.157.146:8123',
        '94.100.18.111:3128',
        '18.141.177.23:80',
        '193.56.255.181:3128',
        '116.242.89.230:3128',
        '188.166.252.135:8080',
        '103.28.121.58:3128',
        '103.28.121.58:80',
        '119.84.215.127:3256',
        '217.172.122.14:8080',
        '79.122.230.20:8080',
        '167.172.109.12:46249',
        '176.113.73.102:3128',
        '88.99.10.252:1080',
        '167.172.109.12:37355',
        '193.239.86.248:3128',
        '113.195.224.222:9999',
        '112.98.218.73:57658',
        '15.207.196.77:3128',
        '223.113.89.138:1080',
        '36.7.252.165:3256',
        '113.100.209.184:3128',
        '185.38.111.1:8080',
    ]

    const randomIndex = Math.floor(Math.random() * proxies.length)

    return `http://${proxies[randomIndex]}`
}

const BASE_URL = 'https://api.scandict.com/api/'
const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mzc2MCwibmFtZSI6IkhvYW5nIEh1eSIsInBob25lIjoiMDM5NDYwNDgzMCIsInBhc3N3b3JkIjoiJDJ5JDEwJDFmcjkwZ2VLQXFzWkVrejh1MEdxa09VL3gzL1pRdS5MN2pRa2sxVHFjbGJxZ1k1ZVp4MTBDIiwibm9pc2UiOiI2NWJlZmRjNWEwNWVhIiwiYWN0aXZlIjoxLCJ2ZXJpZnlfcGhvbmUiOjAsImNyZWF0ZWRfYXQiOiIyMDI0LTAyLTAzVDIwOjAwOjIxLjAwMDAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNC0xNFQwNjowNTozNS4wMDAwMDBaIiwiZW1haWwiOiJob2FuZ2h1eS5kZXYwMjEwQGdtYWlsLmNvbSIsInNlY3Jlc3RfY29kZSI6MCwiZXhwaXJlc19zZWNyZXN0X2NvZGUiOm51bGwsImFjdGl2YXRpb25fY29kZSI6bnVsbCwiZGF0ZV9leHBpcmVzIjpudWxsLCJwYWNrYWdlIjowLCJwYWNrYWdlX2V4cGlyZXMiOm51bGx9.jgRObiR0h43NQImrO97XYliVGXlcLUskCCvyTeZRuek'

const APP_MIX = 'MOLZEI634GO7Eaz7l4eK3i/rembzb2Mkl7h1ItTSyeg='

export const callApiDecrypt = async (
    url: string,
    method: string,
    params: Record<string, any>,
) => {
    const data = await axios({
        method,
        baseURL: BASE_URL,
        url,
        params,
        headers: {
            token,
            lang: 'vi',
        },
    })
        .then((res) => {
            const response = res.data

            if ('data' in response) {
                const encrypted_json = JSON.parse(
                    atob(response.data.substr(13)),
                )

                const decryptedJson = cryptoJs.AES.decrypt(
                    encrypted_json.value,
                    cryptoJs.enc.Base64.parse(APP_MIX),
                    {
                        iv: cryptoJs.enc.Base64.parse(encrypted_json.iv),
                    },
                )

                const originalText = JSON.parse(
                    decryptedJson.toString(cryptoJs.enc.Utf8),
                )

                response.data = originalText
            }

            return response
        })
        .catch((err) => {
            console.log(err)
            return null
        })

    return data
}

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const callApi = async (
    url: string,
    method: string,
    params: Record<string, any>,
    replaceBaseURL = false,
) => {
    const agent = new HttpsProxyAgent(getProxy())

    const data = await axios({
        method,
        baseURL: replaceBaseURL ? undefined : BASE_URL,
        url,
        params,
        headers: {
            token,
            lang: 'vi',
        },
        httpAgent: {
            agent,
        },
    })
        .then((res) => {
            return res.data
        })
        .catch(async (err) => {
            if (err?.response?.data?.message === 'Too Many Attempts.')
                if (err?.response.status === 429) {
                    await sleep(1 * 60 * 1000)
                    console.log('Sleep 1 minute')
                    return callApi(url, method, params, replaceBaseURL)
                }

            return null
        })

    return data
}
