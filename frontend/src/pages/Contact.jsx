import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Contact = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await axios.post(backendURL + '/api/contact/add', formData)
      if (response.data.success) {
        toast.success(response.data.message)
        setFormData({
          name: '',
          mobile: '',
          message: ''
        })
      } else {
        toast.error(response.data.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt='Contact Image' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel: +94 76 485 4578 <br /> Email: karthik@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Trendify</p>
          <p className='text-gray-500'>Learn more about our teams and job opportunities.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <div className='flex flex-col justify-center items-start gap-6 w-full md:max-w-[480px]'>
          <div className='inline-flex items-center gap-2 mb-2'>
            <p className='prata-regular text-3xl'>Get In Touch</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
          </div>
          <p className='text-gray-500'>Have a question or need assistance? We'd love to hear from you.</p>
          
          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 w-full'>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={onChangeHandler}
              className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500'
              required
            />
            <input
              type='tel'
              name='mobile'
              placeholder='Your Mobile Number'
              value={formData.mobile}
              onChange={onChangeHandler}
              className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500'
              required
            />
            <textarea
              name='message'
              placeholder='Your Message or Need'
              value={formData.message}
              onChange={onChangeHandler}
              className='w-full px-3 py-2 border border-gray-800 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500'
              required
            />
            <button 
              type='submit' 
              disabled={isSubmitting}
              className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact