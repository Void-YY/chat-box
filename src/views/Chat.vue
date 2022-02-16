<template>
  <div class="chat-area">
    <b-alert class="title" show>{{ $route.query.name }}</b-alert>
    <div class="history-area">
      <b-alert show variant="primary" class="bubble from-they">
        Primary Alert</b-alert
      >
      <b-alert show variant="dark" class="bubble from-me">
        Primary AlertPrimary AlertPrimary AlertPrimary AlertPrimary AlertPrimary
        AlertPrimary AlertPrimary Alert</b-alert
      >
    </div>
    <b-input-group class="input-area">
      <b-form-input
        size="lg"
        placeholder="Enter message"
        v-model="message"
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
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    toRoom() {
      this.$router.push('/room')
    },
    sendMessage() {
      this.$socket.emit(this.$event.SEND_MESSAGE, {
        from: this.$store.state.user.login_info.name,
        to: this.$route.query.name,
        message: this.message,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.chat-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  > .title {
    width: 100%;
    margin-bottom: 0;
  }
  > .history-area {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
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
  > .input-area {
    align-self: end;
    button,
    input {
      border-radius: 0;
    }
  }
}
</style>
