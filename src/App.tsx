import React from 'react';
import FloatingImages from './components/FloatingImages';
import FloatingImagesRaw from './components/FloatingImagesRaw';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* FloatingImagesコンポーネント: 画面上に浮遊する画像を表示 */}
      <FloatingImages imagesCount={15} />
      
      <div className="bg-white p-8 rounded-lg shadow-md z-10 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">浮遊する画像アニメーション</h1>
        
        <p className="mb-4">
          以下のHTMLコードをあなたのウェブサイトのヘッダー部分に貼り付けてください：
        </p>

        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800">
            <strong>カスタマイズのヒント：</strong><br />
            コード内の <code className="bg-yellow-100 px-1">images</code> 配列を編集することで、
            好きな画像に変更できます。画像のパスを変更するだけで、
            あなたのオリジナルの画像でアニメーションを作成できます。
          </p>
        </div>
        
        {/* コードを表示するプレビューエリア */}
        <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto max-h-96">
          <pre className="whitespace-pre-wrap text-sm">
            <code>{FloatingImagesRaw}</code>
          </pre>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            上記のコードをコピーしてHTMLファイルのヘッダー部分に貼り付けてください。
          </p>
          <button 
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => navigator.clipboard.writeText(FloatingImagesRaw)}
          >
            クリップボードにコピー
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;