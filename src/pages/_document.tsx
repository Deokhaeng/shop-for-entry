import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { RecoilRoot } from 'recoil';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <body>
          <RecoilRoot>
            <Main />
            <div id="portal" />
            <NextScript />
          </RecoilRoot>
        </body>
      </Html>
    );
  }
}
