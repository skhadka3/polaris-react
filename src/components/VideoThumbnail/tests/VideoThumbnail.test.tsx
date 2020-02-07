import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {VideoThumbnail} from '../VideoThumbnail';

describe('<VideoThumbnail />', () => {
  const spy = jest.fn();
  const mockProps = {
    thumbnailUrl: '',
    videoLength: 350,
    onClick: spy,
    onBeforeStartPlaying: spy,
  };

  it('renders with start button and custom overlay', () => {
    const videoThumbnail = mountWithApp(<VideoThumbnail {...mockProps} />);

    expect(videoThumbnail.find('button')).not.toBeNull();
    expect(
      videoThumbnail.find('div', {className: 'Thumbnail'})!.prop('style')!
        .backgroundImage,
    ).toBe(`url(${mockProps.thumbnailUrl})`);
    expect(videoThumbnail.find('p', {className: 'Timestamp'}))!.not.toBeNull();
  });

  it('calls the onClick when the play button is clicked', () => {
    const videoThumbnail = mountWithAppProvider(
      <VideoThumbnail {...mockProps} />,
    );
    trigger(videoThumbnail.find('button'), 'onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onMouseEnter when the enter button is pressed', () => {
    const videoThumbnail = mountWithAppProvider(
      <VideoThumbnail {...mockProps} />,
    );
    trigger(videoThumbnail.find('button'), 'onMouseEnter');
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onTouchStart when the play button is pressed', () => {
    const videoThumbnail = mountWithAppProvider(
      <VideoThumbnail {...mockProps} />,
    );
    trigger(videoThumbnail.find('button'), 'onTouchStart');
    expect(spy).toHaveBeenCalled();
  });
});
