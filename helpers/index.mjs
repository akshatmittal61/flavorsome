export const omit = (obj, key) => {
	let object = obj;
	if (obj._doc) object = obj.toJSON();
	const { [key]: omitted, ...rest } = object;
	return rest;
};

// eslint-disable-next-line eqeqeq
export const remove = (arr, value) => arr.filter((ele) => ele != value);
