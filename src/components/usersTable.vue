<template>
  <div class='table'>
    <h1>Пользователи</h1>
    <el-table
      :data='users'
      style='width: 100%; margin-bottom: 20px'
      row-key='phone'
      border
      default-expand-all
    >
      <el-table-column prop='name' label='Имя' sortable width='180'>
      </el-table-column>
      <el-table-column prop='phone' label='Телефон' sortable width='180'>
      </el-table-column>
    </el-table>
    <el-button @click='(dialogFormVisible = true), getAllUsers(users)' type="success" round>Добавить</el-button>
    <el-dialog
      title='Добавить пользователя'
      :visible.sync='dialogFormVisible'
      @close='allUsers = []'
    >
      <el-form :model='form'>
        <el-form-item label='Имя' :label-width='formLabelWidth'>
          <el-input v-model='form.name' autocomplete='off'></el-input>
        </el-form-item>
        <el-form-item label='Телефон' :label-width='formLabelWidth'>
          <el-input v-model='form.phone' type="number" autocomplete='off'></el-input>
        </el-form-item>
        <el-form-item label='Начальник' :label-width='formLabelWidth'>
          <el-select v-model='form.lead' placeholder='Выбрать из списка'>
            <el-option
              v-for='lead in allUsers'
              :key='lead.id'
              :label='lead.name'
              :value='lead.id'
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button type="danger" round @click='cancelForm()'>Отмена</el-button>
        <el-button type="success" round @click='addUser()'>Добавить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'usersTable',
  data() {
    return {
      allUsers: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: null,
        phone: null,
        lead: null,
      },
      formLabelWidth: '120px',
      users: [
        {
          id: 1,
          name: 'Марина',
          phone: '+ 7 909 951 28 81',
          children: [],
        },
        {
          id: 2,
          name: 'Петр',
          phone: '+ 7 909 951 28 85',
          children: [],
        },
        {
          id: 3,
          name: 'Алексей',
          phone: '+ 7 909 951 28 83',
          children: [
            {
              id: 31,
              name: 'Денис',
              phone: '+ 7 909 951 28 84',
              children: [],
            },
            {
              id: 32,
              name: 'Алина',
              phone: '+ 7 909 951 28 86',
              children: [],
            },
          ],
        },
        {
          id: 4,
          name: 'Иван',
          phone: '+ 7 909 951 28 89',
          children: [],
        },
      ],
    };
  },
  methods: {
    addUser() {
      if (this.form.lead === null) {
        this.users.push({
          id: this.$uuid.v4(),
          name: this.form.name,
          phone: this.form.phone,
          children: [],
        })
        this.saveUsersToLocal()
        this.cancelForm()
      } else {
        this.addUserToChildrenArray(this.users)
      }
    },
 
    cancelForm() {
      this.dialogFormVisible = false
      this.allUsers = []
      this.form.name = null
      this.form.phone = null
      this.form.lead = null
    },

    addUserToChildrenArray(users) {
      let formUserId = this.form.lead
      let childrenUser = {
        id: this.$uuid.v4(),
        name: this.form.name,
        phone: this.form.phone,
        children: [],
      }
      users.forEach(user => this.addToChildren(user, formUserId, childrenUser))
      this.saveUsersToLocal()
      this.cancelForm()
    },

    addToChildren(user, userleadId, userAdd) {
      if (user.id === userleadId) {
        user.children.push(userAdd)
      } else {
        if (user.children.length > 0) {
          user.children.forEach(item => this.addToChildren(item, userleadId, userAdd)) 
        }
      }
    },

    getAllUsers(users) {
      users.forEach((item) => {
        this.allUsers.push({
          id: item.id,
          name: item.name,
          phone: item.phone,
          children: item.children
        })
        if (item.children.length > 0) {
          this.getAllUsers(item.children)
        }
      })
    },
    saveUsersToLocal () {
      let usersSaveToLocal = this.users
      localStorage.setItem('users', JSON.stringify(usersSaveToLocal))
      usersSaveToLocal = JSON.parse(localStorage.getItem(usersSaveToLocal))
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
.table {
  margin: 0 auto;
  display: table;
}
.el-select {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
