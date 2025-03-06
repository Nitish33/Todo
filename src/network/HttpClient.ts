const Get = (url: string, params?: Record<string, any>) => {
  return new Promise(async (resolve, reject) => {
    try {
      const finalUrl = encodeURI(JSON.stringify(params));
      const response = await fetch(`${url}?${finalUrl}`, {method: 'GET'});

      if (response.ok) {
        reject('Api Error');
      }

      return response.json().then(v => resolve(v));
    } catch (error) {
      reject('Api Error');
    }
  });
};

const Post = (url: string, data: Record<string, any>) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        reject('Api Error');
      }

      return response.json().then(v => resolve(v));
    } catch (error) {
      reject('Api Error');
    }
  });
};

const Put = (url: string, data: Record<string, any>) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reject('Api Error');
      }

      return response.json().then(v => resolve(v));
    } catch (error) {
      reject('Api Error');
    }
  });
};

const HttpClient = {
  Get,
  Put,
  Post,
};

export default HttpClient;
