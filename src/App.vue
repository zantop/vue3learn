<template>
    <div id="nav">
        <router-link to="/">Home</router-link> | <router-link to="/setup">Setup</router-link> |
        <router-link to="/reactive">Reactive</router-link> |
        <router-link to="/ref">Ref</router-link> |
        <router-link to="/computed">Computed</router-link> |
        <router-link to="/readonly">ReadOnly</router-link> |
        <router-link to="/watcheffect">WatchEffect</router-link> |
        <router-link to="/watch">Watch</router-link> | <router-link to="/raw">toRaw</router-link> |
        <router-link to="/life">Life</router-link> |
        <router-link to="/provide">Provide</router-link>
    </div>
    <div class="content">
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.content {
    width: 800px;
    margin: 0 auto;
    text-align: left;
}
.red {
    color: rgb(212, 5, 5);
}
.green {
    color: green;
}
</style>
