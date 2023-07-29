import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

//reemplazar esta url por la que devuelva ngrok
const serverUrl = 'http://localhost:3001';
//const serverUrl = 'https://ec38-2800-810-458-8706-c83e-2559-2032-72dd.ngrok-free.app';

const buildPostUrl = (key) => `${serverUrl}/${key}`;

const buildPatchUrl = (key, id) => `${serverUrl}/${key}/${id}`;

const useDataFetch = ({ key, refetchInterval }) =>
  useQuery(key, () => axios.get(buildPostUrl(key)).then((res) => res.data), {
    refetchInterval: refetchInterval,
  });

const storeValue = ({ key, value }) => axios.post(buildPostUrl(key), value);

const modifyValue = ({ key, id, value }) => {
  axios.patch(buildPatchUrl(key, id), value);
};

const useDataStore = ({ keysToInvalidate, onSuccess, onError, method = 'POST' }) => {
  const queryClient = useQueryClient();

  let mutationFunction;
  if (method === 'PATCH') {
    mutationFunction = modifyValue;
  } else {
    mutationFunction = storeValue;
  }

  return useMutation(mutationFunction, {
    onSuccess: async () => {
      await Promise.all(
        keysToInvalidate.map((keyToInvalidate) => queryClient.invalidateQueries(keyToInvalidate))
      );
      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  });
};

export { useDataFetch, useDataStore };
