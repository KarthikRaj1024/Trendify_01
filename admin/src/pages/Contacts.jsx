import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { MessageCircle, Phone, User, Calendar } from "lucide-react";

const Contacts = ({ token }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all contacts from the backend
  const fetchAllContacts = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(backendUrl + "/api/contact/list", {
        headers: { token },
      });
      if (response.data.success) {
        setContacts(response.data.contacts.reverse()); // Reverse to show latest contacts first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Customer Contacts</h3>
        <div className="text-sm text-gray-600">
          Total: {contacts.length} messages
        </div>
      </div>
      
      {contacts.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No contact messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {new Date(contact.date).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{contact.mobile}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600 text-sm leading-relaxed">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;