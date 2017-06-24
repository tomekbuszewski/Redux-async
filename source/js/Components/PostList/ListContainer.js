import React from 'react';
import { getLastPart, getType } from '../../Services/UrlParser';
import { orderByCriteria, filterByCriteria } from '../../Services/Database';

import Card from '../../Containers/Card';

const ListContainer = ({ url, posts }) => <div>{orderByCriteria(filterByCriteria(posts, getType(url), 'slug', getLastPart(url)), 'date').map(i => <Card key={i.id} thumbnail={i.thumbnail} link={i.url} title={i.title} />)}</div>;

export default ListContainer;
