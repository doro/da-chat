class MessagesController < ApplicationController

  def index
    msgs = Message.all
    if params['bookmark']
      msgs = msgs.where('id > ?', params['bookmark'])
    end
    
    respond_to do |format|
      format.json { render json: msgs.to_json }
    end
    
  end

  def create
  end
end
