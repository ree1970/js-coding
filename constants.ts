import type { Challenge } from './types';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: '課題1: Hello World!',
    difficulty: 'Easy',
    description: 'console.log("Hello World!"); を正しく記述する。',
    code: 'console.log("Hello World!");'
  },
  {
    id: 2,
    title: '課題2: 変数の宣言と代入',
    difficulty: 'Easy',
    description: '変数 message を宣言し、"Hello" を代入し、console.log(message); で出力する。',
    code: 'let message = "Hello";\nconsole.log(message);'
  },
  {
    id: 3,
    title: '課題3: アラート表示',
    difficulty: 'Easy',
    description: 'alert("こんにちは！"); を実行して、アラートを表示する。',
    code: 'alert("こんにちは！");'
  },
  {
    id: 4,
    title: '課題4: 簡単な計算',
    difficulty: 'Medium',
    description: 'let a = 10; let b = 5; console.log(a + b); を記述して、15 を出力する。',
    code: 'let a = 10;\nlet b = 5;\nconsole.log(a + b);'
  },
  {
    id: 5,
    title: '課題5: 条件分岐 (if文)',
    difficulty: 'Medium',
    description: 'let age = 20; if (age >= 18) { ... } を記述して、"成人です" を出力する。',
    code: 'let age = 20;\nif (age >= 18) {\n  console.log("成人です");\n} else {\n  console.log("未成年です");\n}'
  },
  {
    id: 6,
    title: '課題6: 関数を定義する',
    difficulty: 'Medium',
    description: '名前を引数として受け取り、挨拶を返す関数 greet を作成して呼び出す。',
    code: 'function greet(name) {\n  return "こんにちは、" + name + "さん！";\n}\nconsole.log(greet("山田"));'
  },
  {
    id: 7,
    title: '課題7: 配列を操作する',
    difficulty: 'Medium',
    description: '果物の配列を作成し、2番目の要素（バナナ）をコンソールに出力する。',
    code: 'const fruits = ["りんご", "バナナ", "みかん"];\nconsole.log(fruits[1]);'
  },
  {
    id: 8,
    title: '課題8: ループ処理',
    difficulty: 'Hard',
    description: 'forループを使って、1から3までの数字をコンソールに順番に出力する。',
    code: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}'
  },
  {
    id: 9,
    title: '課題9: オブジェクトの利用',
    difficulty: 'Hard',
    description: 'ユーザー情報を格納したオブジェクトを作成し、名前を取り出してコンソールに出力する。',
    code: 'const user = {\n  name: "鈴木",\n  age: 30\n};\nconsole.log(user.name);'
  },
  {
    id: 10,
    title: '課題10: DOMを操作する',
    difficulty: 'Hard',
    description: "画面上のテキストを、好きな文章に書き換えてみましょう。「'」で囲まれた部分に、自由なテキストを入力してプレビューで確認してください。",
    code: "const element = document.getElementById('message');\nif (element) {\n  element.textContent = 'ここに好きなテキストを入力';\n}",
    hasDOMPreview: true,
    initialHTML: `<h1 id="message" class="text-3xl font-bold text-gray-100 transition-all duration-300">ここに結果が表示されます</h1>`,
    template: {
      prefix: "const element = document.getElementById('message');\nif (element) {\n  element.textContent = '",
      suffix: "';\n}"
    }
  }
];