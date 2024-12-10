import { Avatar, Carousel, Dropdown, List, MenuProps, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

type DataType = {
  avatar: string;
  author: string;
  content: string;
  img: string[];
  status: string;
  date: string;
};
interface Props {
  data: DataType[];
}

const items: MenuProps['items'] = [
  {
    label: 'Preview',
    key: 'preview',
  },
  {
    label: 'Delete',
    key: 'delete',
    danger: true,
  },
];

const Listing = ({ data }: Props) => {
  return (
    <List
      data-testid="list"
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item key={index} className="!mb-3.5 !rounded-lg !bg-white !px-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <Carousel
              arrows
              infinite={false}
              className="!h-56 !w-full !min-w-64 !max-w-64 md:!min-w-96 md:!max-w-96"
            >
              {item.img.map((image, index) => (
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
            <div className="flex flex-col md:mr-3">
              <p className="text-base leading-normal">
                {item.content.length > 150
                  ? item.content.substring(0, 150) + '... '
                  : item.content}
                {item.content.length > 80 && (
                  <span className="!p-0 !text-primary hover:underline">
                    Read More
                  </span>
                )}{' '}
              </p>
              <div className="mb-auto mt-5">
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} className="!bg-gray-200" />}
                  description={item.author}
                  className="!flex !items-center"
                />
              </div>
              <div>
                {item.status && (
                  <Tag
                    className={classNames(
                      '!rounded-lg !border-none !px-4 !py-0.5',
                      {
                        '!bg-primary-light !text-primary':
                          item.status === 'Publised',
                        '!bg-gray-100 !text-gray-400':
                          item.status !== 'Publised',
                      },
                    )}
                  >
                    {item.status}
                  </Tag>
                )}
                {item.date && (
                  <Tag className="!rounded-lg !border-none !bg-primary-light !px-4 !py-0.5 !text-primary">
                    {item.date}
                  </Tag>
                )}
              </div>
            </div>
            <div className="absolute right-1 cursor-pointer md:right-5">
              <Dropdown
                aria-label="More options"
                menu={{
                  items: [
                    ...items,
                    item.status === 'Publised'
                      ? { label: 'Draft', key: 'draft' }
                      : { label: 'Publish', key: 'publish' },
                  ],
                }}
              >
                <MoreOutlined aria-label="More options" className="!text-lg" />
              </Dropdown>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default Listing;
