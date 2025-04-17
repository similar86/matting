import React from 'react';

export default function App({ users }) {
  return (
    <div>
      <h1>マッチングアプリ</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.age}歳) - 興味: {user.interests.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}