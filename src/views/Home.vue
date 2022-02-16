<template>
  <div>
    <b-list-group horizontal="md">
      <b-list-group-item
        v-for="user in userList"
        :key="user.id"
        class="d-flex align-items-center"
        @click="toChat(user)"
      >
        <b-avatar
          class="mr-3"
          variant="primary"
          :text="user.name[0].toUpperCase()"
        ></b-avatar>
        <span class="mr-auto">{{ user.name }}</span>
        <!-- <b-badge>12</b-badge> -->
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: [],
    }
  },

  sockets: {
    connect: function () {
      this.connectWebSocket()
    },
    UPDATE_USER_LIST: function (data) {
      const { name } = this.$route.query
      this.userList = data.filter((user) => user.name !== name)
    },
  },
  mounted() {
    this.connectWebSocket()
  },
  methods: {
    connectWebSocket() {
      const { name } = this.$route.query
      if (!name) {
        this.$store.dispatch('user/signOut')
      }
      this.$socket.emit(this.$event.REGISTER, {
        name: name,
      })
    },
    toChat(user) {
      this.$router.push({
        name: 'Chat',
        query: {
          me: this.$route.query.name,
          name: user.name,
          socketId: user.socketId,
        },
      })
    },
  },
}
</script>
<style scoped>
.primary {
  background: #0d6efd;
  color: white;
}
</style>
