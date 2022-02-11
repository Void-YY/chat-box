<template>
  <div>
    <b-list-group horizontal="md">
      <b-list-group-item class="d-flex align-items-center" @click="toChat('test')">
        <b-avatar class="mr-3" variant="primary" text="BV"></b-avatar>
        <span class="mr-auto">BootstrapVue</span>
        <b-badge>12</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
export default {
  methods: {
    toChat(name) {
      this.$router.push({
        name: "Chat",
        query: {
          name: name,
        },
      });
    },
  },
};
</script>
<style scoped>
.primary {
  background: #0d6efd;
  color: white;
}
</style>
