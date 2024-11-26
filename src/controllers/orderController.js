import Order from '../models/Order.js';
import Book from '../models/Book.js';

export const getAllOrders = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(query)
      .populate('user', 'username email')
      .populate('book', 'title author price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const order = new Order({
      user: req.user._id,
      book: bookId,
      quantity,
      totalPrice: book.price * quantity,
    });

    book.stock -= quantity;
    await book.save();
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};