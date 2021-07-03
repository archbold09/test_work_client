<template>
  <v-app>
    <Header />
    <v-main>
      <Transition>
        <slot />
      </Transition>
    </v-main>
  </v-app>
</template>

<script>
import Transition from "@/components/Transition";
import Header from "@/components/Header/Index";
export default {
  name: "LayoutDashboard",
  components: {
    Transition,
    Header,
  },
};
</script>
