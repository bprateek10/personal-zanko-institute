import { Avatar, Carousel, Modal, Tag } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

interface ContentDataType {
  avatar: string;
  author: string;
  content: string;
  img: string[];
  status?: string;
  date?: string;
}

interface props {
  handleCancel: () => void;
  modalData: ContentDataType | undefined;
}

const ContentModal = ({ handleCancel, modalData }: props) => {
  return (
    <Modal
      open={!!modalData}
      centered
      onCancel={handleCancel}
      footer={null}
      key="key"
      data-testid="content-modal"
    >
      <div className="mt-6">
        <Carousel arrows infinite={false}>
          {modalData?.img.map((image, index) => (
            <div key={index}>
              <Image
                className="h-56 w-full rounded-md object-cover"
                alt={`${index}-img`}
                src={image}
                width={500}
                height={500}
              />
            </div>
          ))}
        </Carousel>
        <div className="mt-4 flex items-center gap-4">
          <Avatar src={modalData?.avatar} className="!bg-gray-200" />
          <p className="text-gray-500">{modalData?.author}</p>
        </div>
        <div className="mt-4">
          {modalData?.status && (
            <Tag
              className={classNames('!rounded-lg !border-none !px-4 !py-0.5', {
                '!bg-primary-light !text-primary':
                  modalData?.status === 'Publised',
                '!bg-gray-100 !text-gray-400': modalData?.status !== 'Publised',
              })}
            >
              {modalData?.status}
            </Tag>
          )}
          {modalData?.date && (
            <Tag className="!rounded-lg !border-none !bg-primary-light !px-4 !py-0.5 !text-primary">
              {modalData?.date}
            </Tag>
          )}
        </div>
        <div className="mt-2 text-justify">
          <span>{modalData?.content} </span>
        </div>
      </div>
    </Modal>
  );
};

export default ContentModal;
