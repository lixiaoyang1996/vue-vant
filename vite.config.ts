import { loadEnv } from 'vite'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { UserConfig, ConfigEnv } from 'vite'

const CWD = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD)

  const isBuild = command === 'build'
  console.log(isBuild)
  console.log(mode)
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // 按需载入 vant
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: () => {
              return `vant/lib/index.css`
            }
          }
        ]
      })
    ],
    server: {
      port: 4500,
      open: true,
      cors: true,

      proxy: {
        '/console': {
          target: 'http://10.40.204.134/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
