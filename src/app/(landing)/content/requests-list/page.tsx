'use client';
import { Spin } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentModal from '../components/contentModal';
import Listing from '../content-list/components/listing';

interface ContentDataType {
  avatar: string;
  author: string;
  content: string;
  img: string[];
}

const dummyData = Array.from({ length: 23 }).map((_, i) => ({
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  author: 'User Name',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  img: [
    'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
    'https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=600&quality=80',
  ],
}));

const RequestsList = () => {
  const [selectedContent, setSelectedContent] = useState<ContentDataType>();
  const [data, setData] = useState(dummyData.slice(0, 7));

  const openModal = (data: ContentDataType) => {
    setSelectedContent(data);
  };

  const handleCancel = () => {
    setSelectedContent(undefined);
  };

  const loadMoreData = () => {
    setData(dummyData.slice(0, data.length + 7));
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <h1 className="flex justify-center pl-3 pt-1 text-3xl font-bold">
          Approval Requests
        </h1>
      </div>
      <div
        data-testid="scrollableDiv"
        id="scrollableDiv"
        className="no-scrollbar mt-6 grid h-[calc(100vh_-_441px)] gap-4 overflow-y-scroll md:h-[calc(100vh_-_151px)]"
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 20}
          loader={<Spin />}
          scrollableTarget="scrollableDiv"
          className="!overflow-hidden"
        >
          <Listing data={data} openModal={openModal} showRequestActions />
        </InfiniteScroll>
      </div>
      <ContentModal handleCancel={handleCancel} modalData={selectedContent} />
    </>
  );
};

export default RequestsList;
