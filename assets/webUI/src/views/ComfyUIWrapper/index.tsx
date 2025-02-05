import './index.less';

interface IComfyUIWrapperParams {
  url: string;
}
function ComfyUIWrapper(props: IComfyUIWrapperParams) {
  const { url } = props;
  return (
    <div className={'comfy-ui-container'}>
      {url ? <iframe src={url} frameBorder="0"></iframe> : <div>url cannot be null...</div>}
    </div>
  );
}

export default ComfyUIWrapper;
