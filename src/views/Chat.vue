<template>
  <div class="chat-area">
    <b-alert class="title" show>{{ $route.query.name }}</b-alert>
    <div class="history-area"></div>
    <b-input-group class="input-area">
      <b-form-input
        size="lg"
        placeholder="Enter message"
        v-model="message"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="info" :disabled="!message">Send</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      message: "",
    };
  },
  methods: {
    toRoom() {
      this.$router.push("/room");
    },
  },
};
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
