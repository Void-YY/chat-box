<template>
  <div class="main-layout">
    <b-navbar toggleable="lg" class="nav" type="dark" variant="success">
      <b-navbar-brand href="#" class="title">Chat Box</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/home">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view class="route"></router-view>
  </div>
</template>
<style lang="scss" scoped>
.main-layout{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .nav{
    width: 100%;
  }
  > .route{
    width: 100%;
    flex-grow: 1;
  }
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
