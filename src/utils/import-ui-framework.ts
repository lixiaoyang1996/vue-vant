import { App } from 'vue'
import { Button, Tabbar, TabbarItem, NavBar, Form, Field, Picker, Popup } from 'vant'

const plugins = [Button, Tabbar, TabbarItem, NavBar, Form, Field, Picker, Popup]

export default function importUiFramework(app: App) {
  plugins.forEach((item) => {
    app.use(item)
  })
  return app
}
