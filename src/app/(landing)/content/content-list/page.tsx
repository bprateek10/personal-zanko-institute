'use client';
import { Button, Dropdown } from 'antd';
import { AlignCenterOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from './components/filter';
import Loader from '@/components/loader';
import Listing from './components/listing';
import ContentModal from '../components/contentModal';

const dummyData = Array.from({ length: 23 }).map((_, i) => ({
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  author: 'User Name',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  img: [
    'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
    'https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=600&quality=80',
  ],
  status: 'Publised',
  date: '4 Aug, 2024',
}));
interface ContentDataType {
  avatar: string;
  author: string;
  content: string;
  img: string[];
  status: string;
  date: string;
}

interface ModalType {
  open: boolean;
  modalData: ContentDataType | null;
}

const ContentListing = () => {
  const [{ open, modalData }, setOpen] = useState<ModalType>({
    open: false,
    modalData: null,
  });
  const [data, setData] = useState(dummyData.slice(0, 7));

  const openModal = (data: ContentDataType) => {
    setOpen({ open: true, modalData: data });
  };

  const handleCancel = () => {
    setOpen({ open: false, modalData: null });
  };

  const loadMoreData = () => {
    setData(dummyData.slice(0, data.length + 7));
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <h1 className="flex justify-center pl-3 pt-1 text-3xl font-bold">
          Content
        </h1>
        <div className="flex justify-center">
          <Button
            className="!rounded-md !bg-primary !p-5 !text-white"
            icon={<PlusOutlined />}
          >
            New Post
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 pb-8 pt-4 md:flex-row md:justify-center">
        <Filter />
        <div className="self-start md:ml-auto md:mr-4 md:self-center">
          <Dropdown
            menu={{
              items: [
                { label: 'Published', key: 'published' },
                { label: 'Uploaded', key: 'uploaded' },
              ],
            }}
          >
            <AlignCenterOutlined className="!text-lg" />
          </Dropdown>
        </div>
      </div>
      <div
        data-testid="scrollableDiv"
        id="scrollableDiv"
        className="no-scrollbar grid h-[calc(100vh_-_441px)] gap-4 overflow-y-scroll md:h-[calc(100vh_-_251px)]"
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 20}
          loader={<Loader size="default" />}
          scrollableTarget="scrollableDiv"
          className="!overflow-hidden"
        >
          <Listing data={data} openModal={openModal} />
        </InfiniteScroll>
      </div>
      <ContentModal
        open={open}
        handleCancel={handleCancel}
        modalData={modalData}
      />
    </>
  );
};

export default ContentListing;
