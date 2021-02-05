// const API_URL = 'http://localhost:5000';

export async function listLogEntries(){
  // const response = await fetch(`${API_URL}/api/logs`);
  const response = await fetch(`/api/logs`);
  const result = await response.json();
  return result;
}

export async function createLogEntry(entry){
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  // const response = await fetch(`${API_URL}/api/logs`, {
  const response = await fetch(`/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': apiKey
    },
    body: JSON.stringify(entry)
  });
  const result = await response.json();
  if(response.ok){
    return result;
  }
  const error = new Error(result.message);
  // whenever an axios request throws an error
  // the error object has response on it (that is the actual parse response)
  error.response = result;
  throw error;
}
