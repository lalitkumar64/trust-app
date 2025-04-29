import React, { useState } from 'react';
import { Button, Drawer, Card, Avatar, Badge, Tag, Space, Popconfirm, message, Divider, Tooltip } from 'antd';
import { FiBell, FiEye, FiCheck, FiX, FiTrash2, FiPhone, FiUser, FiCalendar, FiCreditCard } from 'react-icons/fi';

// Dummy request data
const dummyRequests = [
  {
    id: 1,
    name: 'John Doe',
    fatherName: 'Robert Doe',
    surname: 'Doe',
    adharNo: '1234 5678 9012',
    phone: '+1 (555) 123-4567',
    photo: 'https://example.com/photo1.jpg',
    status: 'pending',
    requestDate: '2024-04-27'
  },
  {
    id: 2,
    name: 'Jane Smith',
    fatherName: 'Michael Smith',
    surname: 'Smith',
    adharNo: '9876 5432 1098',
    phone: '+1 (555) 987-6543',
    photo: 'https://example.com/photo2.jpg',
    status: 'pending',
    requestDate: '2024-04-26'
  }
  // Add more dummy requests as needed
];

const RequestSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [requests, setRequests] = useState(dummyRequests);

  const handleAccept = (id) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
    message.success('Request accepted successfully');
  };

  const handleReject = (id) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    message.error('Request rejected');
  };

  const handleRemove = (id) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    message.info('Request removed');
  };

  const pendingCount = requests.filter(req => req.status === 'pending').length;

  const getStatusStyles = (status) => {
    switch(status) {
      case 'accepted': 
        return 'bg-green-50 text-green-600 border-green-200';
      case 'rejected': 
        return 'bg-red-50 text-red-600 border-red-200';
      default: 
        return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  const getActionButtonStyles = (type) => {
    switch(type) {
      case 'view':
        return 'text-blue-600 hover:bg-blue-50 focus:ring-blue-200';
      case 'accept':
        return 'text-green-600 hover:bg-green-50 focus:ring-green-200';
      case 'reject':
      case 'delete':
        return 'text-red-600 hover:bg-red-50 focus:ring-red-200';
      default:
        return 'text-gray-600 hover:bg-gray-50 focus:ring-gray-200';
    }
  };

  return (
    <>
      <Badge count={pendingCount} offset={[-5, 5]}>
        <Button
          icon={<FiBell className="text-lg" />}
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 bg-white hover:bg-gray-50"
        >
          Requests
        </Button>
      </Badge>

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Member Requests</span>
            <Badge count={pendingCount} className="ml-2">
              <span className="text-sm text-gray-500">Pending</span>
            </Badge>
          </div>
        }
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={400}
        className="bg-gray-50"
      >
        <div className="space-y-4">
          {requests.map((item) => (
            <Card
              key={item.id}
              className="rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
              bodyStyle={{ padding: '16px' }}
            >
              <div className="flex items-start gap-4">
                <Avatar
                  src={item.photo}
                  size={72}
                  className="rounded-lg flex-shrink-0 border-2 border-gray-100"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/72?text=Photo';
                  }}
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <Tag 
                        className={`mt-1 rounded border px-2 py-0.5 text-xs font-medium ${getStatusStyles(item.status)}`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Tag>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <span className="truncate">{item.fatherName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <span className="truncate">{item.surname}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="text-gray-400" />
                      <span className="truncate">{item.adharNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" />
                      <span className="truncate">{item.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <FiCalendar className="text-gray-400" />
                    <span>Request Date: {item.requestDate}</span>
                  </div>

                  <div className="border-t border-gray-100 my-3" />

                  <div className="flex justify-end gap-2">
                    {item.status === 'pending' && (
                      <>
                        <Tooltip title="View Details" placement="top">
                          <Button
                            type="text"
                            icon={<FiEye className="text-blue-600" />}
                            className={`w-9 h-9 p-0 flex items-center justify-center rounded-lg ${getActionButtonStyles('view')}`}
                            onClick={() => message.info('Viewing details...')}
                          />
                        </Tooltip>
                        <Tooltip title="Accept Request" placement="top">
                          <Button
                            type="text"
                            icon={<FiCheck className="text-green-600" />}
                            className={`w-9 h-9 p-0 flex items-center justify-center rounded-lg ${getActionButtonStyles('accept')}`}
                            onClick={() => handleAccept(item.id)}
                          />
                        </Tooltip>
                        <Tooltip title="Reject Request" placement="top">
                          <Button
                            type="text"
                            icon={<FiX className="text-red-600" />}
                            className={`w-9 h-9 p-0 flex items-center justify-center rounded-lg ${getActionButtonStyles('reject')}`}
                            onClick={() => handleReject(item.id)}
                          />
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="Remove Request" placement="top">
                      <Popconfirm
                        title="Remove request"
                        description="Are you sure you want to remove this request?"
                        onConfirm={() => handleRemove(item.id)}
                        okButtonProps={{ 
                          danger: true,
                          className: 'bg-red-500 hover:bg-red-600'
                        }}
                      >
                        <Button
                          type="text"
                          icon={<FiTrash2 className="text-red-600" />}
                          className={`w-9 h-9 p-0 flex items-center justify-center rounded-lg ${getActionButtonStyles('delete')}`}
                        />
                      </Popconfirm>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default RequestSection;