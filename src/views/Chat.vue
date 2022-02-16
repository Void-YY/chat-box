<template>
  <div class="chat-area">
    <b-alert class="title" show
      >{{ $route.query.name }}
      <b-button class="download-button" variant="primary">
        <b-icon
          icon="cloud-arrow-down-fill"
          aria-label="Help"
          @click="downloadHistory"
        ></b-icon>
      </b-button>
    </b-alert>
    <div ref="history" class="history-area">
      <div v-for="(message, index) in history" :key="index">
        <b-alert
          v-if="message.from === $route.query.name"
          show
          variant="primary"
          class="bubble from-they"
        >
          {{ message.message }}</b-alert
        >
        <b-alert v-else show variant="dark" class="bubble from-me">
          {{ message.message }}</b-alert
        >
      </div>
    </div>
    <b-input-group class="input-area">
      <b-form-input
        size="lg"
        placeholder="Enter message"
        v-model="message"
        @keyup.enter="sendMessage"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="info" :disabled="!message" @click="sendMessage"
          >Send</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
import Papa from 'papaparse'
import dayjs from 'dayjs'
export default {
  sockets: {
    connect: function () {
      this.connectWebSocket()
    },
    RECEIVE_MESSAGE: function (data) {
      this.history.push(data)
    },
    GET_HISTORY: function (data) {
      this.history = data
    },
  },
  data() {
    return {
      message: '',
      history: [],
    }
  },
  watch: {
    history: function (val) {
      this.$nextTick(() => {
        this.$refs.history.scrollTop = this.$refs.history.scrollHeight
      })
    },
  },
  mounted() {
    this.$socket.emit('GET_HISTORY', {
      from: this.$store.state.user.login_info.name,
      to: this.$route.query.name,
    })
  },
  methods: {
    connectWebSocket() {
      const { name } = this.$store.state.user.login_info
      if (!name) {
        this.$store.dispatch('user/signOut')
      }
      this.$socket.emit(this.$event.REGISTER, {
        name: name,
      })
    },
    toRoom() {
      this.$router.push('/room')
    },
    sendMessage() {
      if (!this.message) return
      const messageObject = {
        from: this.$store.state.user.login_info.name,
        to: this.$route.query.name,
        message: this.message,
      }
      this.$socket.emit(this.$event.SEND_MESSAGE, messageObject)
      this.history.push(messageObject)
      this.message = ''
    },
    downloadHistory() {
      const data = this.history.map((data) => {
        return {
          from: data.from,
          to: data.to,
          message: data.message,
          datetime: dayjs(data.time).format('YYYY-MM-DD HH:mm:ss'),
        }
      })
      const csv = Papa.unparse(data)
      const blob = new Blob([csv], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Result.csv'
      link.click()
    },
  },
}
</script>
<style lang="scss" scoped>
.chat-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .title {
    width: 100%;
    margin-bottom: 0;
    height: 3em;
    > .download-button {
      position: absolute;
      right: 0.25em;
      top: 0.25em;
    }
  }
  > .history-area {
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
    height: 0;
    border: 1px solid #ccc;
    padding: 10px;
    > div {
      display: flex;
      flex-direction: column;
      > .bubble {
        text-align: left;
        width: fit-content;
        max-width: 80vw;
        &.from-me {
          align-self: flex-end;
        }
      }
    }
  }
  > .input-area {
    align-self: end;
    button,
    input {
      border-radius: 0;
    }
  }
}
</style>
