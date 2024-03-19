<script setup lang="ts">
import { ref } from 'vue';
import CardPokemon from './CardPokemon.vue';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query';
import { getPokemons, refreshData } from '../../services/pokemon.services';

const filters = ref<{
  name: string;
  page: number;
  pageSize: number;
}>({
  page: 1,
  pageSize: 10,
  name: '',
});

const searchTerm = ref<string>('');

const { data, isFetching, isError, isPlaceholderData, refetch } = useQuery({
  queryKey: ['pokemons', filters],
  queryFn: async () => getPokemons(filters.value),
  placeholderData: keepPreviousData,
});

const { isPending: isPedingRefresh, mutateAsync: handleMutationRefreshData } = useMutation({
  mutationFn: refreshData,
});

const nextPage = () => {
  if (!isPlaceholderData.value) {
    filters.value.page++;
  }
};

const prevPage = () => {
  filters.value.page--;
};

const updateSearchTerm = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchTerm.value = target.value;
  if (target.value === '') {
    filters.value.name = searchTerm.value;
  }
};

const search = () => {
  filters.value.name = searchTerm.value;
};

const handleRefresh = async () => {
  await handleMutationRefreshData();
  filters.value = {
    name: '',
    pageSize: 10,
    page: 1,
  };
  searchTerm.value = '';
  refetch();
};
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:justify-between items-center mb-6 w-full gap-4">
    <form @submit.prevent="search" class="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
      <input
        class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
        :value="searchTerm"
        @change="updateSearchTerm"
        @input="updateSearchTerm"
        type="search"
        placeholder="Search by name..."
      />
      <button class="px-4 py-2 bg-blue-500 text-white rounded-md w-full lg:w-auto" type="submit">Search</button>
    </form>

    <div class="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
      <button
        class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full"
        :disabled="Boolean(isPedingRefresh)"
        @click="handleRefresh"
      >
        {{ Boolean(isPedingRefresh) ? 'Refreshing...' : 'Refresh Data' }}
      </button>
      <div class="flex items-center" v-if="!isFetching && !isError && data?.pokemons.length">
        <button
          @click="prevPage"
          :disabled="!data?.meta.hasPreviousPage"
          class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">{{ data?.meta.currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="!data?.meta.hasNextPage"
          class="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <p class="text-3xl font-black" v-if="isFetching && !isError && !data?.pokemons.length">Loading...</p>
  <p class="text-3xl font-black" v-if="!isFetching && !isError && !data?.pokemons.length">Not found pokemons</p>
  <p class="text-3xl font-black" v-if="!isFetching && isError && !data?.pokemons.length">Error from server</p>

  <div
    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3"
    v-if="!isFetching && !isError && data?.pokemons.length"
  >
    <template :key="pokemon.id" v-for="pokemon in data.pokemons">
      <CardPokemon :name="pokemon.name" :idPokemon="pokemon.idPokemon" :color="pokemon.color" />
    </template>
  </div>
</template>
