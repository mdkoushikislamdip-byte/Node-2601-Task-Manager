const UserAvatarGroup = ({ members }) => {
  return (
    <div className="flex -space-x-2 border-t border-t-gray-300 pt-2">
      {members?.map((user, i) => (
        <div
          key={user?._id || i}
          className="w-8 h-8 rounded-full text-blue-600 bg-gray-300 border-2 border-white flex items-center justify-center font-bold overflow-hidden"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.fullName || "member"}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            user?.fullName?.charAt(0)?.toUpperCase()
          )}
        </div>
      ))}
    </div>
  );
};

export default UserAvatarGroup;