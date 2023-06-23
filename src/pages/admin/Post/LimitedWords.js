import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, Tooltip, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getAllLimitsWord, updateListsWord } from '../../../api/post';
const App = () => {
    const { token } = theme.useToken();
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    const fetchData = async () => {
        const response = await getAllLimitsWord()
        const { data } = response.data
        setTags(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
        updateListsWord(newTags)

    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
            updateListsWord([...tags, inputValue])
        }
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        newTags(newTags)
        setEditInputIndex(-1);
        setInputValue('');
    };
    const tagInputStyle = {
        width: 78,
        verticalAlign: 'top',
    };
    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };
    return (
        <Space size={[0, 8]} wrap>
            <h6 style={{ marginTop: 5, marginRight: 10 }}>Limited words:</h6>
            <Space size={[0, 8]} wrap>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={editInputRef}
                                key={tag}
                                size="large"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={true}
                            style={{
                                userSelect: 'none',
                            }}
                            color='volcano'
                            onClose={() => handleClose(tag)}
                        >
                            <span
                                onDoubleClick={(e) => {
                                    setEditInputIndex(index);
                                    setEditInputValue(tag);
                                    e.preventDefault();
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
            </Space>
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} onClick={showInput}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
        </Space>
    );
};
export default App;