require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});
console.log('index.js 実行開始');


const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const fetch = require('node-fetch');
const App = require('./app.jsx').default;

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            users {
              id
              name
              age
              interests
            }
          }
        `
      }),
    });

    const result = await response.json();
    console.log('GraphQLのレスポンス:', result);

    if (result.data && result.data.users) {
      console.log('取得成功:', result.data.users);
    } else {
      console.error('データ取得失敗:', result.errors || result);
    }
  } catch (err) {
    console.error('fetchエラー:', err);
  }
}

fetchUsers(); // ← 実行



