<template>
  <!-- Background color split screen for large screens -->
  <div class="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
  <div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
  <div class="relative min-h-screen flex flex-col">
    <!-- Navbar -->
    <Disclosure as="nav" class="flex-shrink-0 bg-indigo-600" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <!-- Logo section -->
          <div class="flex items-center px-2 lg:px-0 xl:w-64">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                alt="Workflow"
              />
            </div>
          </div>

          <!-- Search section -->
          <div class="flex-1 flex justify-center lg:justify-end">
            <div class="w-full px-2 lg:px-6">
              <ModeSelector />
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="
                bg-indigo-600
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-indigo-400
                hover:text-white
                hover:bg-indigo-600
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-indigo-600
                focus:ring-white
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuAlt1Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Links section -->
          <div class="hidden lg:block lg:w-80">
            <div class="flex items-center justify-end">
              <div class="flex">
                <a
                  href="#"
                  class="
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                    text-indigo-200
                    hover:text-white
                  "
                  >Documentation</a
                >
                <a
                  href="#"
                  class="
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                    text-indigo-200
                    hover:text-white
                  "
                  >Support</a
                >
              </div>
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-4 relative flex-shrink-0">
                <div>
                  <MenuButton
                    class="
                      bg-indigo-700
                      flex
                      text-sm
                      rounded-full
                      text-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-offset-indigo-700
                      focus:ring-white
                    "
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="
                      origin-top-right
                      absolute
                      z-10
                      right-0
                      mt-2
                      w-48
                      rounded-md
                      shadow-lg
                      py-1
                      bg-white
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >View Profile</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Settings</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Logout</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="lg:hidden">
        <div class="px-2 pt-2 pb-3">
          <a
            href="#"
            class="
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              text-white
              bg-indigo-800
            "
            >Dashboard</a
          >
          <a
            href="#"
            class="
              mt-1
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              text-indigo-200
              hover:text-indigo-100
              hover:bg-indigo-600
            "
            >Support</a
          >
        </div>
        <div class="pt-4 pb-3 border-t border-indigo-800">
          <div class="px-2">
            <a
              href="#"
              class="
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                text-indigo-200
                hover:text-indigo-100
                hover:bg-indigo-600
              "
              >Your Profile</a
            >
            <a
              href="#"
              class="
                mt-1
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                text-indigo-200
                hover:text-indigo-100
                hover:bg-indigo-600
              "
              >Settings</a
            >
            <a
              href="#"
              class="
                mt-1
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                text-indigo-200
                hover:text-indigo-100
                hover:bg-indigo-600
              "
              >Sign out</a
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!-- 3 column wrapper -->
    <div class="flex-grow w-full mx-auto lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex flex-col xl:flex-row flex-1 min-w-0 bg-white xl:flex">
        <div
          class="
            order-2
            xl:order-1
            border-b border-gray-200
            pr-2
            xl:border-b-0
            xl:flex-shrink-0
            xl:w-64
            xl:border-r xl:border-gray-200
            bg-white
            overflow-y-hidden overflow-x-scroll
            xl:overflow-y-scroll xl:overflow-x-hidden
            h-[10.5rem]
            xl:h-[calc(100vh-4rem)]
          "
        >
          <div class="h-full px-2 py-1">
            <!-- Start left column area -->
            <div class="h-full relative">
              <div class="flex flex-col">
                <PalletSet />
              </div>
            </div>
            <!-- End left column area -->
          </div>
        </div>

        <div class="order-1 xl:order-2 bg-white lg:min-w-0 lg:flex-1">
          <div class="h-full py-6 px-4 sm:px-6 lg:px-8">
            <!-- Start main area-->
            <div class="relative" style="min-height: 36rem">
              <CanvasSet />
            </div>
            <!-- End main area -->
          </div>
        </div>
      </div>

      <div
        class="
          bg-gray-50
          pr-4
          sm:pr-6
          lg:pr-8
          lg:flex-shrink-0
          lg:border-l lg:border-gray-200
          xl:pr-0
        "
      >
        <div class="h-full pl-6 py-6 lg:w-80">
          <!-- Start right column area -->
          <div class="h-full relative" style="min-height: 16rem">
            <div
              class="
                absolute
                inset-0
                border-2 border-gray-200 border-dashed
                rounded-lg
              "
            />
          </div>
          <!-- End right column area -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from "./store.js";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { SearchIcon } from "@heroicons/vue/solid";
import { MenuAlt1Icon, XIcon } from "@heroicons/vue/outline";
import PalletSet from "./components/PalletSet.vue";
import ModeSelector from "./components/ModeSelector.vue";
import CanvasSet from "./components/CanvasSet.vue";

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>