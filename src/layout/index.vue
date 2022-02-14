<template>
  <div class="main-layout">
    <b-navbar toggleable="lg" class="nav" type="dark" variant="success">
      <b-navbar-brand href="#" class="title">Chat Box</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            @click="
              changeRoute({
                name: 'Home',
                query: {
                  name: $store.state.user.login_info.name,
                },
              })
            "
          >
            Home
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item @click="signOut"> Sign Out </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
    <transition name="fade-transform" mode="out-in">
      <router-view class="route"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  methods: {
    changeRoute(route) {
      this.$router.push(route)
    },
    signOut() {
      this.$store.dispatch('user/signOut')
    },
  },
}
</script>
<style lang="scss" scoped>
.main-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .router-link {
    color: #fff;
  }
  > .nav {
    width: 100%;
  }
  > .route {
    width: 100%;
    flex-grow: 1;
  }
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
