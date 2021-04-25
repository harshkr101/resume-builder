export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.body.user.id, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({ createdBy: req.params.id })
      .lean()
      .exec();
    if (docs.length)
      res.status(200).json({ data: docs });
    else
      res.status(404).json({ error: 'No user data available' });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

export const createOne = model => async (req, res) => {
  const createdBy = req.body.user.id;
  try {
    const doc = await model.create({ ...req.body.data, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.body.user.id,
          _id: req.params.id
        },
        req.body.data,
        { new: true }
      )
      .lean(true)
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.body.user.id,
      _id: req.params.id
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});

export default crudControllers;