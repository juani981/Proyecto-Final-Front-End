
export const mapper = {
    map: (rawData, customMap) => {
      return rawData.map(item => {
        const mappedItem = {};
  
        for (const key in customMap) {
          if (customMap.hasOwnProperty(key)) {
            const mappedKey = customMap[key];
            mappedItem[key] = item[mappedKey];
          }
        }
  
        return mappedItem;
      });
    },
  
    reverseMap: (mappedData, customMap) => {
      return mappedData.map(item => {
        const originalItem = {};
  
        for (const key in customMap) {
          if (customMap.hasOwnProperty(key)) {
            const mappedKey = customMap[key];
            originalItem[mappedKey] = item[key];
          }
        }
  
        return originalItem;
      });
    },
  };
  