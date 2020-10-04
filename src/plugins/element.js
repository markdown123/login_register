import Vue from 'vue'
import { Button, Form, Input, FormItem, Message, MessageBox, Table, TableColumn } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
Vue.use(MessageBox)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
