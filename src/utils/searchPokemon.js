export const searchPokemon = (allData, data, searchIp) =>
  searchIp
    ? allData.filter(
        (el) =>
          el.name.toLowerCase().includes(searchIp.toLowerCase()) ||
          el.id.toString().includes(searchIp)
      )
    : data;
