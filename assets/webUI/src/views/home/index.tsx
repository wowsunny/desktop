import { Layout } from 'antd';

import ComfyUIWrapper from '../ComfyUI';
import './index.less';

const { Content, Header } = Layout;
function Home() {
  return (
    <div className={'web-ui'}>
      <Header className="web-ui-header">
        <div>奇点裂变</div>
      </Header>
      <Layout className="web-ui-layout">
        <Content>
          <div className="web-ui-right-part-wrapper">
            <ComfyUIWrapper url={'http://127.0.0.1:8188'} />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
